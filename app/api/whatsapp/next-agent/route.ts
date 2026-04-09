// app/api/whatsapp/next-agent/route.ts

import { NextResponse } from 'next/server';
// import { getAgents, updateAgentLoad } from '@/lib/strapi'; // هادو مبقيناش كنستعملوهم هنا

// زذنا هاد الواجهة باش TypeScript يعرف شنو هو WhatsAppAgent
interface WhatsAppAgent {
  id: number;
  attributes: {
    name: string;
    phoneNumber: string;
    currentLoad: number;
    maxLoad: number;
    isActive: boolean;
  };
}

// قادينا السمية ديال التوكن باش تطابق مع داكشي لي درتي فـ admin
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN; 
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'; // درنا هادي كاحتياط يلا ماقراش .env

async function fetchAgentsWithToken() {
  const res = await fetch(`${STRAPI_URL}/api/whatsapp-agents?pagination[limit]=100`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    cache: 'no-store' // باش مايخبيش الداتا القديمة
  });
  if (!res.ok) throw new Error(`Failed to fetch agents: ${res.status}`);
  const json = await res.json();
  return json.data as WhatsAppAgent[];
}

async function updateAgentLoadWithToken(agentId: number, newLoad: number) {
  const res = await fetch(`${STRAPI_URL}/api/whatsapp-agents/${agentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: { currentLoad: newLoad } }),
  });
  if (!res.ok) throw new Error(`Failed to update agent load: ${res.status}`);
}

export async function POST(request: Request) {
  try {
    const { productName, requestedQuantity } = await request.json();

    // 1. جلب الأرقام النشطة
    const agents = await fetchAgentsWithToken();
    const activeAgents = agents.filter(a => a.attributes?.isActive === true);
    
    if (activeAgents.length === 0) {
      return NextResponse.json({ error: 'No agents available' }, { status: 503 });
    }

    // 2. اختيار الرقم لي عندو أقل ضغط
    let selectedAgent = activeAgents.reduce((prev, curr) =>
      (curr.attributes.currentLoad || 0) < (prev.attributes.currentLoad || 0) ? curr : prev
    );

    // 3. تحديث الضغط مع المحاولة في حالة الخطأ
    let retries = 3;
    let updated = false;
    while (retries > 0 && !updated) {
      try {
        const newLoad = (selectedAgent.attributes.currentLoad || 0) + 1;
        await updateAgentLoadWithToken(selectedAgent.id, newLoad);
        updated = true;
        selectedAgent.attributes.currentLoad = newLoad; 
      } catch (error) {
        const refreshed = await fetchAgentsWithToken();
        const freshAgent = refreshed.find(a => a.id === selectedAgent.id);
        if (freshAgent) {
          selectedAgent = freshAgent;
          retries--;
        } else {
          throw new Error('Agent disappeared');
        }
      }
    }
    
    if (!updated) throw new Error('Failed to update load after retries');

    // 4. نقص الضغط بعد 60 ثانية (Background)
    setTimeout(async () => {
      try {
        const current = selectedAgent.attributes.currentLoad || 0;
        const newLoad = Math.max(0, current - 1);
        await updateAgentLoadWithToken(selectedAgent.id, newLoad);
      } catch (err) {
        console.error('Failed to decrement load for agent', selectedAgent.id, err);
      }
    }, 60000);

    // 5. تجهيز الرابط ديال واتساب
    const message = `السلام عليكم، مهتم بطلب:\nالمنتج: ${productName}\nالكمية: ${requestedQuantity}`;
    const whatsappUrl = `https://wa.me/${selectedAgent.attributes.phoneNumber}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ whatsappUrl, agentId: selectedAgent.id });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
// lib/strapi.ts

// زدنا هاد الواجهة باش TypeScript يعرف المكونات ديال WhatsAppAgent وميبقاش يعطي إيرور
export interface WhatsAppAgent {
  id: number;
  attributes: {
    name: string;
    phoneNumber: string;
    currentLoad: number;
    maxLoad: number;
    isActive: boolean;
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!res.ok) {
    console.error(`Strapi API Error: ${res.status} on path ${path}`);
    throw new Error(`Strapi error: ${res.status}`);
  }
  
  return res.json();
}

export async function getAgents(): Promise<WhatsAppAgent[]> {
  const data = await fetchAPI<{ data: WhatsAppAgent[] }>('/whatsapp-agents?pagination[limit]=100');
  return data.data || []; // زدنا هاد || [] كحماية إضافية يلا رجع خاوي
}

export async function updateAgentLoad(agentId: number, newLoad: number): Promise<void> {
  await fetchAPI(`/whatsapp-agents/${agentId}`, {
    method: 'PUT',
    body: JSON.stringify({ data: { currentLoad: newLoad } }),
  });
}
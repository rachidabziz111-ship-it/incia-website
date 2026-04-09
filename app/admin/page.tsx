'use client';
import { useState, useEffect } from 'react';

// عدلنا الواجهة باش تقبل Strapi القديم والجديد
interface WhatsAppAgent {
  id: number;
  name?: string;
  phoneNumber?: string;
  currentLoad?: number;
  maxLoad?: number;
  isActive?: boolean;
  attributes?: {
    name: string;
    phoneNumber: string;
    currentLoad: number;
    maxLoad: number;
    isActive: boolean;
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; 

export default function AdminDashboard() {
  const [agents, setAgents] = useState<WhatsAppAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchAgents = async () => {
    if (!STRAPI_URL || !API_TOKEN) {
      console.error("المتغيرات فـ .env.local ما مقريينش!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${STRAPI_URL}/api/whats-app-agents?pagination[limit]=100`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Error fetching');
      const json = await res.json();
      setAgents(json.data || []); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchAgents();
  }, [authenticated]);

  const updateAgent = async (id: number, data: any) => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/whats-app-agents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ data }),
      });
      if (res.ok) fetchAgents();
    } catch (error) {
      console.error(error);
    }
  };

  const resetLoad = (id: number) => updateAgent(id, { currentLoad: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) setAuthenticated(true);
    else alert('كلمة السر خاطئة!');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded w-full mb-4" />
          <button type="submit" className="bg-teal-600 text-white w-full py-2 rounded font-bold">Login</button>
        </form>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-black">جاري جلب البيانات...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
        <h1 className="text-2xl font-bold mb-6">WhatsApp Agent Manager</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100 font-bold">
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Load</th>
                        <th className="px-4 py-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(agent => {
                        // هادي هي الضربة القاضية: كنقراو البيانات سواء كانت فـ attributes أو ديريكت فـ agent
                        const name = agent?.attributes?.name || agent?.name || 'بدون اسم';
                        const phone = agent?.attributes?.phoneNumber || agent?.phoneNumber || 'بدون رقم';
                        const currentLoad = agent?.attributes?.currentLoad || agent?.currentLoad || 0;
                        const maxLoad = agent?.attributes?.maxLoad || agent?.maxLoad || 50;
                        const isActive = agent?.attributes?.isActive ?? agent?.isActive ?? false;

                        return (
                          <tr key={agent.id}>
                              <td className="px-4 py-2 border">{name}</td>
                              <td className="px-4 py-2 border">{phone}</td>
                              <td className="px-4 py-2 border">{currentLoad} / {maxLoad}</td>
                              <td className="px-4 py-2 border text-center">
                                  {isActive ? '✅' : '❌'}
                              </td>
                          </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button 
              onClick={async () => {
                const newPhone = prompt('أدخل رقم الهاتف (مثال: 212600000000)');
                const newName = prompt('أدخل اسم الموظف:');
                if (newPhone && newName) {
                  try {
                    const res = await fetch(`${STRAPI_URL}/api/whats-app-agents`, {
                      method: 'POST',
                      headers: { 
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${API_TOKEN}` 
                      },
                      body: JSON.stringify({ 
                        data: { name: newName, phoneNumber: newPhone, currentLoad: 0, maxLoad: 50, isActive: true } 
                      }),
                    });
                    if (res.ok) fetchAgents();
                    else alert("تأكد واش درتي توكن Full Access فـ Strapi!");
                  } catch (e) {
                    alert("مشكل في الاتصال!");
                  }
                }
              }} 
              className="bg-teal-600 text-white px-6 py-2 rounded font-bold"
          >
              + Add New Agent
          </button>
          
          <button onClick={() => fetchAgents()} className="bg-blue-500 text-white px-4 py-2 rounded">
              تحديث البيانات
          </button>
        </div>
    </div>
  );
}
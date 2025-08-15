'use client';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { User2} from "lucide-react";
import { MeuPerfilForm } from "./_components/PerfilForm";
import { PerfilAvatar } from "./_components/PerfilAvatar";


export default function MeuPerfilPage() {
  const tabs = [
    { id: 'perfil', name: 'Perfil', icon: User2 },
  ];

  const [activeTab, setActiveTab] = useState('perfil');
  

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex gap-8 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-2 pb-2 transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#257432] border-[#257432] font-medium'
                  : 'text-gray-500 border-transparent hover:text-green-500'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          {activeTab === 'perfil' && (
            <>
              {/* Avatar e informações */}
              <PerfilAvatar />

              {/* Formulário */}
              <MeuPerfilForm />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

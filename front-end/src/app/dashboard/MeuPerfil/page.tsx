'use client';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { User2, Lock, Bell, MapPin, Phone, Mail, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MeuPerfilPage() {
  const tabs = [
    { id: 'perfil', name: 'Perfil', icon: User2 },
    { id: 'senha', name: 'Senha', icon: Lock },
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
                  ? 'text-blue-600 border-blue-600 font-medium'
                  : 'text-gray-500 border-transparent hover:text-blue-500'
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                  M
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Maria Santos</h2>
                  <p className="text-gray-500 flex items-center gap-1 text-sm">
                    <Briefcase size={14} /> Técnico
                  </p>
                </div>
              </div>

              {/* Formulário */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo</Label>
                  <div className="relative">
                    <User2 className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" defaultValue="Maria Santos" />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" type="email" defaultValue="tecnico@tribunal.gov.br" />
                  </div>
                </div>

                <div>
                  <Label>Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <Label>Setor</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" defaultValue="TI - Suporte" />
                  </div>
                </div>
              </form>

              <div className="mt-6 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16v4H7v-4M12 12v8m-6 0h12" />
                  </svg>
                  Salvar Alterações
                </Button>
              </div>
            </>
          )}

          {activeTab === 'senha' && (
            <p className="text-gray-600">Aqui virá o formulário de alteração de senha.</p>
          )}

          {activeTab === 'preferencias' && (
            <p className="text-gray-600">Aqui virão as configurações de preferências.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

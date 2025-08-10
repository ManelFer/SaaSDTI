'use client';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { User2 } from "lucide-react";

export default function MeuPerfilPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-2">Configuração de Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações de perfil.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Seu email" />
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
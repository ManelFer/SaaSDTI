
"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { MainCard } from "./components/Cards/Maincard";
import { AcoesRapidasMain } from "./components/AcoesRapidas/AcoesRapidasMain";



export default function DashboardPage() {
  const { user, loading } = useAuth(true);
  if (loading) return <div>Carregando...</div>


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sistema de gerenciamento do setor de TI
            </p>
          </div>
        </div>

        {/* Card do conteúdo */}
        <MainCard />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <AcoesRapidasMain />
        </div>
      </div>
    </DashboardLayout>
  );
}


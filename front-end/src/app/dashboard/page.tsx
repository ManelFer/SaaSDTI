
"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";



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
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl  font-semibold text-center text-gray-800 dark:text-white mb-2">
            Bem-vindo ao sistema {user?.nome} {/* mudar o nome conforme o nome de user adicionado pelo usuario */}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Aqui você poderá visualizar e gerenciar informações do sistema.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}


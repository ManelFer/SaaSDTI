"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CadastroAloc() {
  return (
    <DashboardLayout>
      <div className="rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Alocação de equipamentos
            </h2>
            <p className="text-sm text-gray-500">
              Gerencie aqui as alocações já feitas e adicione novas.
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            + Nova alocação
          </button>
        </div>
      </div>

      {/* Tabela de Alocações */}
      <div className="space-y-4">
        <div>
            <h3 className="font-medium text-gray-900">DTI</h3>
            <p className="text-sm ">Descrição da alocação DTI</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

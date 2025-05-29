"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CadastroMarcas } from "./_components/cadastroMarcas";
import { CadastroEquipamentos } from "./_components/cadastroEquipamentos";
import { TableMarcas } from "./_components/tableMarcas";
import { TableEquipamentos } from "./_components/tableEquipamentos";

export default function CadastroFullPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cadastro de Marcas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Gerencie as marcas dos equipamentos.
            </p>
            <CadastroMarcas />
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cadastro de Equipamentos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Adicione ou edite os equipamentos do setor.
            </p>
            <CadastroEquipamentos />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* table 1 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Lista de Marcas
            </h2>
            <TableMarcas />
          </div>

          {/* table 2 */}
          <div >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Lista de Equipamentos
            </h2>
            {/* Aqui você pode adicionar a tabela de equipamentos */}
            <TableEquipamentos />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

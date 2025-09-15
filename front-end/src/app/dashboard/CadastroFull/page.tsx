"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CadastroMarcas } from "./_components/cadastroMarcas";
import { CadastroEquipamentos } from "./_components/cadastroEquipamentos";
import { CadastroUsuario } from "./_components/cadastroUsuario";
import { CadastroSetor } from "./_components/cadastroSetor";
import { TabelaCadastroSetor } from "./_components/organisms/tabelaCadastroSetor";
import { TabelaCadastroUsuarios } from "./_components/organisms/tabelaCadastroUsuarios";
import { TabelaCadastroEquipamentos } from "./_components/organisms/tabelaCadastroEquipamentos";
import { TabelaCadastroMarcas } from "./_components/organisms/tabelaCadastroMarcas";

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
            <div className="flex justify-between mb-4">
              <CadastroMarcas />
              <div className="w-1/2 flex justify-end">
                <TabelaCadastroMarcas />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cadastro de Equipamentos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Adicione os equipamentos do setor.
            </p>
            <div className="flex justify-between mb-4">
              <CadastroEquipamentos />
              <div className="w-1/2 flex justify-end">
                <TabelaCadastroEquipamentos />
              </div>
            </div>
          </div>

          {/* card 3 */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cadastro de Usuários
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Adicione os usuários do sistema.
            </p>
            <div className="flex justify-between mb-4">
              <CadastroUsuario />
              <div className="w-1/2 flex justify-end">
                <TabelaCadastroUsuarios />
              </div>
            </div>
          </div> */}

          {/* card 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cadastro de Setores
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Adicione os setores ao sistema.
            </p>
            <div className="flex justify-between mb-4">
              <CadastroSetor />
              <div className="w-1/2 flex justify-end">
                <TabelaCadastroSetor />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* table 1 */}
          {/* <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Lista de Marcas
            </h2>
            <TableMarcas />
          </div> */}

          {/* table 2 */}
          <div>
            {/* <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Lista de Equipamentos
            </h2> */}
            {/* Aqui você pode adicionar a tabela de equipamentos */}
            {/* <TableEquipamentos /> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

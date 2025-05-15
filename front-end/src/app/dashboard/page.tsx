"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { CadastroMarcas } from "./_components/cadastroMarcas";


export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <CadastroMarcas />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {" "}
          Sistema de Gerenciamento{" "}
        </h1>
        <p className="text-gray-600">Aqui vai ficar o dashboard.</p>
      </div>
    </DashboardLayout>
  );
}

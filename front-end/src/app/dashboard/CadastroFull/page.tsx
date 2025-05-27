'use client';
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CadastroFullPage() {
  return (
    <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Cadastro Completo</h1>
      <p className="text-gray-600 mb-6">Esta página está em construção. Em breve, você poderá realizar cadastros completos aqui.</p>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-gray-500">Obrigado pela sua paciência!</p>
      </div>
    </div>
    </DashboardLayout>
  );
}
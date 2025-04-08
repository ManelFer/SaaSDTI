'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4"> Sistema de Gerenciamento </h1>
        <p className="text-gray-600">
          Aqui vai ficar o dashboard.
        </p>
      </div>
    </DashboardLayout>
  );
} 
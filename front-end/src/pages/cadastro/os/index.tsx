// src/pages/cadastros/os/index.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrdemServicoList() {
  // Simulação de dados
  const ordensServico = [
    { id: 1, equipamento: 'Notebook Dell', problema: 'Não liga' },
    { id: 2, equipamento: 'Desktop HP', problema: 'Troca de HD' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
        <Link href="/cadastros/os/novo">
          <Button>Nova OS</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problema</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordensServico.map((os) => (
              <tr key={os.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{os.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{os.equipamento}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{os.problema}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/cadastros/os/${os.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
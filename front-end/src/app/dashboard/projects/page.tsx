'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro de Ordem de Serviço</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Cadastrar Ordem de Serviço
          </button>
        </div>
        
        <Table>
          <TableCaption>Lista de Ordens de Serviço</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Número da OS</TableHead>
              <TableHead>Data / Hora Abertura</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Setor / Fórum </TableHead>
              <TableHead>Pat. Equipamento</TableHead>
              <TableHead>Tipo de Falha</TableHead>
              <TableHead>Solução técnica</TableHead>
              <TableHead>Data / Hora Recolhido</TableHead>
              <TableHead>Data / Hora Devolvido</TableHead>
              <TableHead>Data / Hora do Fechamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Técnico Responsável</TableHead>
            </TableRow>
          </TableHeader>

          
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>0001/2002</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>João da Silva</TableCell>
              <TableCell>Setor de Controle</TableCell>
              <TableCell>ABC1234567890</TableCell>
              <TableCell>Falha no sistema</TableCell>
              <TableCell>Reinício do sistema</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>Resolvido</TableCell>
              <TableCell className='text-right'>José da Silva</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
        
      </div>
    </DashboardLayout>
  );
} 
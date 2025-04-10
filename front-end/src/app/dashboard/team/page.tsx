'use client';
import { Register } from './_components/register';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TeamPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro de Equipamentos</h1>
          <Register />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Lista de Produtos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Equipamento</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Número de Série</TableHead>
                <TableHead>Patrimônio</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead className='text-right'>Quantidade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Notebook</TableCell>
                <TableCell>Dell</TableCell>
                <TableCell>Inspiron 15</TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell className='text-right'>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
} 
'use client';
import { Retirada } from './_components/retirada';
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
import { Estoque } from '@/models/estoque.model';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { buscarEstoque } from '@/services/estoque.service';

export default function EstoquePage() {
  const [isEstOpen, setEstOpen] = useState(false);
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  
  useEffect(() => {
    const fetchEstoque = async () => {
      const estoqueData = await buscarEstoque();
      setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
    };
    fetchEstoque();
  }, [])
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro de Equipamentos 📦</h1>
          <Retirada />
          <Register />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Lista de Produtos</TableCaption>
            <TableHeader className='bg-green-100'>
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
              {estoque.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.marca}</TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.numero_serie}</TableCell>
                  <TableCell>{item.patrimonio}</TableCell>
                  <TableCell>{item.lote}</TableCell>
                  <TableCell className='text-right'>{item.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
} 
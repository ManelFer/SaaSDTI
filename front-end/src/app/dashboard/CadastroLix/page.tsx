'use client';
import { Coleta } from './_components/coleta';
import { CadastroL } from './_components/cadastroL';
import {Marcas as MarcasModel} from "@/models/marcas.model"
import { Itens } from '@/models/itens.model';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lixao } from '@/models/lixao.model';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { buscarLixao } from '@/services/lixao.service';
import { buscarMarcas } from '@/services/marcas.service';
import { buscarItens } from '@/services/itens.service';

export default function TeamPage() {
  const [isEstOpen, setEstOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [lixao, setLixao] = useState<Lixao[]>([]);
  const [marcas, setMarca] = useState<MarcasModel[]>([]);
  const [itens, setItens] = useState<Itens[]>([]);

  useEffect(() => {
    const fetchTable = async () => {
      //lista de marcas e productos
      const lixaoData = await buscarLixao();
      const marcasData = await buscarMarcas();
      const itensData = await buscarItens();

      // setando marcas and itens data
      setMarca(marcasData);
      setItens(itensData);
      setLixao(Array.isArray(lixaoData) ? lixaoData : [lixaoData]);
    };
    fetchTable();
  }, []);

  useEffect(() => {
    if (Loading) {
      const fetchLixao = async () => {
        const lixaoData = await buscarLixao();
        setLixao(lixaoData);
        console.log("lixao", lixaoData);
      };
      fetchLixao();
    }
  }, [Loading]);
  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ">Lixão🗑️</h1>
          <Coleta/>
          <CadastroL/>
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
                <TableHead>Descrição</TableHead>
                <TableHead className='text-right'>Quantidade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lixao.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {itens.find((a) => a.id == item.item_id)?.nome}
                  </TableCell>
                  <TableCell>
                    {marcas.find((a) => a.id == item.marca_id)?.nome}
                  </TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.numero_serie}</TableCell>
                  <TableCell>{item.patrimonio}</TableCell>
                  <TableCell>{item.lote}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
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
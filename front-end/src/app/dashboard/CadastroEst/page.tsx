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
import { Marcas } from '@/models/marcas.model';
import { Itens } from '@/models/itens.model';
import { Estoque } from '@/models/estoque.model';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { buscarEstoque } from '@/services/estoque.service';
import { buscarMarcas } from '@/services/marcas.service';
import { buscarItens } from '@/services/itens.service';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export default function EstoquePage() {
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [marcas, setMarca] = useState<Marcas[]>([]);
  const [itens, setItens] = useState<Itens[]>([]);
  
  useEffect(() => {
    const fetchEstoque = async () => {
      //lista de marcas, produtos e estoque
      const estoqueData = await buscarEstoque();
      const marcasData = await buscarMarcas();
      const itensData = await buscarItens();
      
      // setando marcas, itens e estoque data
      setMarca(marcasData);
      setItens(itensData);
      setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
    };
    fetchEstoque();
  }, []);

  const estoqueFiltradas = estoque.filter((estoque) => {
    const searchLower = search.toLowerCase();
    return(
      estoque.item_id !== undefined && estoque.item_id !== null && estoque.item_id.toString().toLowerCase().includes(searchLower) ||
      estoque.marca_id !== undefined && estoque.marca_id !== null && estoque.marca_id.toString().toLowerCase().includes(searchLower) ||
      estoque.modelo?.toLowerCase().includes(searchLower) ||
      estoque.numero_serie?.toLowerCase().includes(searchLower)
    )
  })

  useEffect(() => {
    if (Loading) {
      const fetchEstoque = async () => {
        const estoqueData = await buscarEstoque();
        setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
        console.log("estoque", estoqueData);
        setLoading(false);
      };
      fetchEstoque();
    }
  }, [Loading])
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Estoque</h1>
          <Retirada />
          <Register />
          <div className='relative'>
            <Input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
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
              {estoqueFiltradas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {itens.find((a) => a.id == item.item_id)?.nome}
                  </TableCell>
                  <TableCell>
                    {marcas.find((a) => a.id == item.marca_id)?.nome}
                  </TableCell>
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
"use client";
import { Coleta } from "./_components/coleta";
import { CadastroL } from "./_components/cadastroL";
import { Marcas as MarcasModel } from "@/models/marcas.model";
import { Itens } from "@/models/itens.model";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lixao } from "@/models/lixao.model";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { buscarLixao } from "@/services/lixao.service";
import { buscarMarcas } from "@/services/marcas.service";
import { buscarItens } from "@/services/itens.service";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TeamPage() {
  const [Loading, setLoading] = useState(false);
  const [lixao, setLixao] = useState<Lixao[]>([]);
  const [marcas, setMarca] = useState<MarcasModel[]>([]);
  const [itens, setItens] = useState<Itens[]>([]);
  const [search, setSearch] = useState("");

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

  const lixaoFiltradas = lixao.filter((lixao) => {
    const searchLower = search.toLowerCase();
    return (
      (lixao.item_id !== undefined &&
        lixao.item_id !== null &&
        lixao.item_id.toString().toLowerCase().includes(searchLower)) ||
      (lixao.marca_id !== undefined &&
        lixao.marca_id !== null &&
        lixao.marca_id.toString().toLowerCase().includes(searchLower)) ||
      lixao.modelo?.toLowerCase().includes(searchLower) ||
      lixao.numero_serie?.toLowerCase().includes(searchLower) ||
      lixao.patrimonio?.toLowerCase().includes(searchLower) ||
      lixao.lote?.toLowerCase().includes(searchLower) ||
      lixao.descricao?.toLowerCase().includes(searchLower)
    );
  });

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

  const generatePdf = () => {
    const doc = new jsPDF();
    const tableColumn = ["Equipamento", "Marca", "Patrimônio", "Lote", "Descrição"];
    const tableRows: (string | number)[][] = [];

    lixaoFiltradas.forEach(item => {
      const itemData = [
        itens.find((a) => a.id == item.item_id)?.nome || '',
        marcas.find((a) => a.id == item.marca_id)?.nome || '',
        item.patrimonio || '',
        item.lote || '',
        item.descricao || '',
        item.quantidade || 0
      ];
      tableRows.push(itemData);
    });
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      headStyles: {fillColor: [22, 160, 133]},
    });
    doc.text("Relatório de Lixão", 14, 15);
    doc.save("relatorio_lixao.pdf");
  } 

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ">Lixão</h1>
          <Coleta />
          <CadastroL />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 w-[300px]"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Lista de Produtos</TableCaption>
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="w-[100px]">Equipamento</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Número de Série</TableHead>
                <TableHead>Patrimônio</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lixaoFiltradas.map((item) => (
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
                  <TableCell>{item.lote || "null"}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell className="text-right">
                    {item.quantidade}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 hover:scale-105 duration-300"
          onClick={generatePdf}
        >
          Gerar Relatório
        </Button>
      </div>
    </DashboardLayout>
  );
}

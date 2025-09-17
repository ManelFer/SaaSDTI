"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Marcas } from "@/models/marcas.model";
import { Itens } from "@/models/itens.model";
import { Estoque } from "@/models/estoque.model";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { buscarEstoque, deletarItemEstoque } from "@/services/estoque.service";
import { buscarMarcas } from "@/services/marcas.service";
import { buscarItens } from "@/services/itens.service";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { AtualizacaoE } from "./_components/atualizacaoE";
import { ConfirmacaoDelecao } from "@/components/ui/confirmacaoDelecao";
import { Register } from "./_components/register";

export default function EstoquePage() {
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [Loading, setLoading] = useState(false);
  const [ isEstOpen, setEstOpen ] = useState(false);
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
      setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);

      setItens(itensData);
      setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
    };
    fetchEstoque();
  }, []);

  //update
  const handleUpdate = () => {
    setLoading(true);
  };

  //delete
  const handleDelete = async (id: number) => {
    try {
      await deletarItemEstoque(id);
      setEstoque(estoque.filter((e) => e.id !== id));
      toast.success("Item deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      toast.error("Erro ao deletar item. Tente novamente.");
    }
  };

  //filtro
  const estoqueFiltradas = estoque.filter((estoque) => {
    const searchLower = search.toLowerCase();
    return (
      (estoque.item_id !== undefined &&
        estoque.item_id !== null &&
        estoque.item_id.toString().toLowerCase().includes(searchLower)) ||
      (estoque.marca_id !== undefined &&
        estoque.marca_id !== null &&
        estoque.marca_id.toString().toLowerCase().includes(searchLower)) ||
      estoque.modelo?.toLowerCase().includes(searchLower) ||
      estoque.numero_serie?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    if (Loading) {
      const fetchEstoque = async () => {
        const estoqueData = await buscarEstoque();

        setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);

        setLoading(false);
      };
      fetchEstoque();
    }
  }, [Loading]);

  // Gerar PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Equipamento",
      "Marca",
      "Modelo",
      "Número de Série",
      "Patrimônio",
      "Lote",
      "Quantidade",
    ];
    const tableRows: (string | number)[][] = [];

    estoqueFiltradas.forEach((item) => {
      

      const itemData = [
        itens.find((a) => a.id == item.item_id)?.nome || "",
        marcas.find((a) => a.id == item.marca_id)?.nome || " ",
        item.modelo || "",
        item.numero_serie || " sem número de série ",
        item.patrimonio || " sem patrimônio ",
        item.lote || "",
        item.quantidade || 0,
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });
    doc.text("Relatório de Estoque", 14, 15);
    doc.save("relatorio_estoque.pdf");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Estoque</h1>
          <Register isEstOpen={isEstOpen} setEstOpen={setEstOpen} />
          <div className="relative">
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
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="w-[100px]">Equipamento</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Número de Série</TableHead>
                <TableHead>Patrimônio</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Atualização</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {estoqueFiltradas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {itens && itens.find((a) => a.id == item.item_id)?.nome}
                  </TableCell>
                  <TableCell>
                    {marcas && marcas.find((a) => a.id == item.marca_id)?.nome}
                  </TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.numero_serie}</TableCell>
                  <TableCell>{item.patrimonio}</TableCell>
                  <TableCell>{item.lote}</TableCell>
                  <TableCell className="text-right">
                    {item.quantidade}
                  </TableCell>
                  <TableCell className="text-right">
                    <ConfirmacaoDelecao
                      onConfirm={() =>
                        item.id !== undefined && handleDelete(item.id)
                      }
                    />
                    <AtualizacaoE
                      estoqueItem={item}
                      itens={itens}
                      marcas={marcas}
                      onUpdate={handleUpdate}
                    />
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

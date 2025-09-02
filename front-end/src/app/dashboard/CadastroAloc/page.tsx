"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovimentacaoCard from "./components/MovimentacaoCard";

export default function MovimentacoesPage() {
  const movimentacoes = [
    {
      id: 1,
      setor: "DTI",
      Equipamento: "Notebook",
      Marca: "Daten",
      Modelo: "DCM4A4",
      responsavel: "Manoel",
      tipo: "Alocado" as const,
      patrimonio: 12345
    },
    {
      id: 2,
      setor: "DTI",
      Equipamento: "Monitor",
      Marca: "AOC",
      Modelo: "24B1XHS",
      responsavel: "Manoel",
      tipo: "Leilão" as const,
      patrimonio: 12345
    },
    {
      id: 3,
      setor: "DTI",
      Equipamento: "Desktop",
      Marca: "Ilhaway",
      Modelo: "X123",
      responsavel: "Manoel",
      tipo: "Estoque" as const,
      patrimonio: 12345
    },
  ];

  return (
    <DashboardLayout>
      <div className="rounded-xl p-6">
        {/* Cabeçalho */}
        <Header />

        {/* Barra de busca */}
        <SearchBar />

        {/* Lista de movimentações */}
        <div className="space-y-4">
          {movimentacoes.map((mov) => (
            <MovimentacaoCard key={mov.id} {...mov} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

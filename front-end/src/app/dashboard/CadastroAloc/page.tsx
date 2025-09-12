"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovimentacaoCard from "./components/MovimentacaoCard";
import { toast, Toaster } from "sonner";

const API_URL = "http://192.168.56.1:3001";


type Alocacao = {
  id: number;
  setor_nome: string;
  equipamento_nome: string;
  marca_nome: string;
  patrimonio: string;
  created_at: string;
};

export default function MovimentacoesPage() {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return; // Não faz a requisição se não houver token

    const fetchAlocacoes = async () => {
      try {
        const response = await fetch(`${API_URL}/alocacao`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar alocações");
        }

        const data = await response.json();
        setAlocacoes(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Erro: ${error.message}`);
        } else {
          toast.error("Ocorreu um erro desconhecido ao buscar alocações.");
        }
      }
    };

    fetchAlocacoes();
  }, [token]); // A requisição é refeita se o token mudar

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredAlocacoes = alocacoes.filter((alocacao) => {
    const query = searchQuery.toLowerCase();
    return (
      (alocacao.patrimonio || "").toLowerCase().includes(query) ||
      (alocacao.equipamento_nome || "").toLowerCase().includes(query) ||
      (alocacao.marca_nome || "").toLowerCase().includes(query) ||
      (alocacao.setor_nome || "").toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout>
      <div className="rounded-xl p-6">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <div className="space-y-4 mt-4">
          {filteredAlocacoes.length > 0 ? (
            filteredAlocacoes.map((alocacao) => (
              <MovimentacaoCard key={alocacao.id} {...alocacao} />
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma alocação encontrada.</p>
          )}
        </div>
      </div>
      <Toaster richColors />
    </DashboardLayout>
  );
}
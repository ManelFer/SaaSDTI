'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovimentacaoCard from './components/MovimentacaoCard';
import { toast, Toaster } from 'sonner';
import { Alocacao } from '@/models/alocacao.model';
import { buscarAlocacoes } from '@/services/alocacao.service';

export default function MovimentacoesPage() {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAlocacoes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await buscarAlocacoes();
      setAlocacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao buscar alocações.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlocacoes();
  }, [fetchAlocacoes]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredAlocacoes = alocacoes.filter((alocacao) => {
    if (!alocacao) return false;
    const query = searchQuery.toLowerCase();
    return (
      alocacao.patrimonio?.toLowerCase().includes(query) ||
      alocacao.equipamento_nome?.toLowerCase().includes(query) ||
      alocacao.marca_nome?.toLowerCase().includes(query) ||
      alocacao.modelo?.toLowerCase().includes(query) ||
      alocacao.setor_nome?.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout>
      <div className="rounded-xl p-6">
        <Header onAlocacaoCreated={fetchAlocacoes} />
        <SearchBar onSearch={handleSearch} />
        <div className="space-y-4 mt-4">
          {loading ? (
            <p className="text-center text-gray-500">Carregando alocações...</p>
          ) : filteredAlocacoes.length > 0 ? (
            filteredAlocacoes.map((alocacao) => (
              <MovimentacaoCard
                key={alocacao.id}
                alocacao={alocacao}
                onUpdate={fetchAlocacoes}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhuma alocação encontrada.
            </p>
          )}
        </div>
      </div>
      <Toaster richColors />
    </DashboardLayout>
  );
}

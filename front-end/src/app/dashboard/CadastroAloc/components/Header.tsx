'use client';
import { useState } from 'react';
import { FormNovaAlocacao } from './FormNovaAlocacao';
import { createAlocacao } from '@/services/alocacao.service';
import { toast, Toaster } from 'sonner';

interface HeaderProps {
  onAlocacaoCreated: () => void;
}

export default function Header({ onAlocacaoCreated }: HeaderProps) {
  const [form, setForm] = useState({
    Equipamento: '',
    Marcas: '',
    Patrimonio: '',
    Modelo: '',
    Setor: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAlocacaoSubmit = async () => {
    if (!form.Equipamento || !form.Marcas || !form.Patrimonio || !form.Modelo || !form.Setor) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await createAlocacao({
        equipamento_id: Number(form.Equipamento),
        marca_id: Number(form.Marcas),
        setor_id: Number(form.Setor),
        patrimonio: form.Patrimonio,
        modelo: form.Modelo,
      });

      toast.success('Alocação criada com sucesso!');
      setForm({
        Equipamento: '',
        Marcas: '',
        Patrimonio: '',
        Modelo: '',
        Setor: '',
      });
      onAlocacaoCreated();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.error('Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Alocação</h2>
        <p className="text-sm text-gray-500">
          Controle de alocação dos equipamentos
        </p>
      </div>
      <FormNovaAlocacao
        form={form}
        handleChange={handleChange}
        openDialog={handleAlocacaoSubmit}
      />
      <Toaster richColors />
    </div>
  );
}

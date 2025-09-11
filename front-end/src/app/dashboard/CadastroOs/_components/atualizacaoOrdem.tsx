"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { updateOrdem } from "@/services/ordens.service";
import { Ordem } from "@/models/ordem.model";
import { FormState, OrdemServicoForm } from "./OrdemServicoForm";

interface AtualizacaoOrdemProps {
  ordem: Ordem;
  onUpdate: () => void;
}

export function AtualizacaoOrdem({ ordem, onUpdate }: AtualizacaoOrdemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: FormState) => {
    if (!ordem || !ordem.id) return;

    try {
      const updatedOrdem = {
        setor_id: Number(data.setor),
        tecnico_responsavel_id: Number(data.tecnico_responsavel),
        numero_os: data.numero_os,
        data_abertura: data.data_abertura,
        solicitante: data.solicitante,
        patrimonio: data.patrimonio,
        tipo_falha: data.tipo_falha,
        solucao_tecnica: data.solucao_tecnica,
        data_recolhimento: data.data_recolhimento || undefined,
        data_devolucao: data.data_devolucao || undefined,
        data_fechamento: data.data_fechamento || undefined,
        status: data.status,
      };

      // O manuseio de 'arquivo' deve ser feito com FormData se a API suportar
      // Por simplicidade, esta implementação foca nos dados de texto.
      // Se precisar atualizar o arquivo, a chamada de serviço precisará mudar.

      await updateOrdem(ordem.id, updatedOrdem);
      toast.success("Ordem atualizada com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao atualizar a ordem:", error);
      toast.error("Erro ao atualizar a ordem.");
      throw error; // Lança o erro para o formulário saber que a submissão falhou
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Atualizar Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Modifique os campos abaixo para atualizar a ordem de serviço.
          </DialogDescription>
        </DialogHeader>
        <OrdemServicoForm
          initialData={ordem}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
'use client';
import { Package, Calendar, Trash2 } from 'lucide-react';
import { AtualizacaoAloc } from './AtualizacaoAlocacao';
import { Alocacao } from '@/models/alocacao.model';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deletarItemAlocacao } from '@/services/alocacao.service';
import { toast } from 'sonner';

interface MovimentacaoCardProps {
  alocacao: Alocacao;
  onUpdate: () => void;
}

export default function MovimentacaoCard({ alocacao, onUpdate }: MovimentacaoCardProps) {
  if (!alocacao) {
    return null;
  }
  const tipo = 'Alocado';

  const badgeColors: { [key: string]: string } = {
    Alocado: 'bg-blue-100 text-blue-700',
    Leilão: 'bg-orange-100 text-orange-700',
    Estoque: 'bg-green-100 text-green-700',
  };

  const formattedDate = alocacao.created_at
    ? new Date(alocacao.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Data indisponível';

  const handleDelete = async () => {
    try {
      await deletarItemAlocacao(alocacao.id);
      toast.success('Alocação excluída com sucesso!');
      onUpdate(); // Atualiza a lista na página principal
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha ao excluir alocação.');
      console.error('Erro ao deletar alocação:', error);
    }
  };

  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {alocacao.setor_nome} <span className="mx-2">↔</span> {alocacao.equipamento_nome}
          </h3>
          <p className="text-sm text-gray-600">
            {alocacao.equipamento_nome} {alocacao.marca_nome} {alocacao.modelo}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColors[tipo]}`}>
            {tipo}
          </span> */}

          <AtualizacaoAloc alocacaoItem={alocacao} onUpdate={onUpdate} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente a alocação.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Package className="h-4 w-4" /> Patrimonio: {alocacao.patrimonio}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formattedDate} -{" "}
            <p className="mx-2 opacity-50">Data de cadastro</p>
          </span>
        </div>
      </div>
    </div>
  );
}

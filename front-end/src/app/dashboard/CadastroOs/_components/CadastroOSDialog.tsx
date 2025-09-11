"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormState, OrdemServicoForm } from "./OrdemServicoForm";

interface CadastroOSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: FormState) => Promise<void>;
}

export function CadastroOSDialog({
  isOpen,
  onClose,
  handleSubmit,
}: CadastroOSDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Cadastro de Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Cadastre uma nova ordem de serviço
          </DialogDescription>
        </DialogHeader>
        <OrdemServicoForm onSubmit={handleSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
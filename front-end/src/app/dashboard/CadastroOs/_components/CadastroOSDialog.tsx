"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CadastroOSForm } from "./CadastroOSForm";

interface CadastroOSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  form: any;
  handleChange: (key: string, value: string) => void;
  handleSubmit: () => void;
}

export function CadastroOSDialog({ isOpen, onClose, form, handleChange, handleSubmit }: CadastroOSDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Cadastro de Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Cadastre uma nova ordem de serviço
          </DialogDescription>
        </DialogHeader>
        <CadastroOSForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
          >
            Salvar OS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
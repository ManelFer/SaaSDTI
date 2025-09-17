"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Folder } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, EquipamentoForm } from "../../../../CadastroEst/_components/form";
import { createEstoque } from "@/services/estoque.service";
import { toast } from "react-toastify";
import { Estoque } from "@/models/estoque.model";

const initialState: EquipamentoForm = {
  item_id: "",
  marca_id: "",
  modelo: "",
  numero_serie: "",
  patrimonio: "",
  lote: "",
  quantidade: 0,
};

export function CadastrarEquipamentoEstoque() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<EquipamentoForm>(initialState);

  const handleSubmit = async () => {
    try {
      const equipamentoParaSalvar: Estoque = {
        ...form,
        item_id: Number(form.item_id),
        marca_id: Number(form.marca_id),
      };
      await createEstoque(equipamentoParaSalvar);
      toast.success("Equipamento cadastrado no estoque com sucesso!");
      setIsOpen(false);
      setForm(initialState);
    } catch (error) {
      console.error("Erro ao cadastrar equipamento no estoque:", error);
      toast.error("Erro ao cadastrar equipamento. Tente novamente.");
    }
  };

  return (
    <>
      <Card
        className="p-4 mb-4 bg-green-50 shadow-md rounded-lg cursor-pointer hover:bg-green-100 transition"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center space-x-4">
          <Folder className="h-6 w-6 text-green-500" />
          <h4 className="text-sm font-bold text-green-800">
            Cadastrar Equipamento no estoque
          </h4>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cadastrar Equipamento no Estoque</DialogTitle>
          </DialogHeader>
          <Form form={form} setForm={setForm} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
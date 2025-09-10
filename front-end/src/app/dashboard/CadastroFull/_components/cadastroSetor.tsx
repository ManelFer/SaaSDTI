"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useState} from "react";
import { createSetor } from "@/services/setores.service";
import { Setor } from "@/models/setor.model";
import { FormSetor } from "./organisms/formCadastroSetor";

export function CadastroSetor() {
  const [, setIsOpen] = useState(false);
  const [setor, setSetor] = useState<Setor[]>([]);
  const [form, setForm] = useState({
    nome: ""
  })

  const handleSubmit = async () => {
    try {
      const cleanedForm = {
        ...form,
      };
      const data = await createSetor(cleanedForm);
      toast.success("Setor cadastrado com sucesso!");
      setSetor([...setor, data]);
      setForm({
        nome: "",
      });
      setIsOpen(false);
    } catch (error){
      console.error("Erro ao cadastrar setor", error);
      toast.error("Erro ao cadastrar setor. Tente novamente.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
        >
          Cadastro de Equipamentos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastro de Setores</DialogTitle>
          <DialogDescription>
            Preencha os dados dos Setores.
          </DialogDescription>
          <FormSetor form={form} setForm={setForm}/>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333]"
          >
            Salvar Cadastro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

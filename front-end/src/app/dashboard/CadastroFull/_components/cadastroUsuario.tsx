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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function CadastroUsuario() {
  const [isOpen, setIsOpen] = useState(false);

  // Estado para o formulário
  const [cargo, setCargo] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  // Função para obter os cabeçalhos de autenticação
  const getAuthHeaders = () => {
      const token = localStorage.getItem('token');
      if (!token) {
          toast.error("Token de autenticação não encontrado!");
          return null;
      }
      return { Authorization: `Bearer ${token}` };
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async () => {
    if (!cargo || !nome) {
      toast.warn("Por favor, preencha o cargo e o nome.");
      return;
    }

    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      await axios.post(
        "http://localhost:3001/usuarios/novo",
        { cargo, nome },
        { headers }
      );
      toast.success(`Usuário "${nome}" cadastrado com sucesso!`);
      // Resetar o formulário e fechar o diálogo
      setCargo("");
      setNome("");
      setIsOpen(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Erro desconhecido";
      toast.error(`Falha ao cadastrar usuário: ${errorMessage}`);
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300">
            Cadastro de Usuário
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Usuário</DialogTitle>
            <DialogDescription>
              Selecione o cargo e digite o nome para criar um novo usuário.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cargo" className="text-right">
                Cargo
              </Label>
              <Select onValueChange={setCargo} value={cargo}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defensor">Defensor</SelectItem>
                  <SelectItem value="servidor">Servidor</SelectItem>
                  <SelectItem value="estagiario">Estagiário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
                placeholder="Digite o nome completo"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSubmit} className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333]">
              Salvar Cadastro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

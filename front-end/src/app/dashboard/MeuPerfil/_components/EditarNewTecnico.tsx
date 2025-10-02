"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { atualizarTecnico } from "@/services/tecnicos.service";
import { Tecnico } from "@/models/tecnico.model";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

interface EditarNewTecnicoProps {
  EditTecnico: Tecnico;
  onUpdate: () => void;
}
export function EditarNewTecnico({
  EditTecnico,
  onUpdate,
}: EditarNewTecnicoProps) {
  const [nome, setNome] = useState(EditTecnico.nome);
  const [email, setEmail] = useState(EditTecnico.email);
  const [role, setRole] = useState(EditTecnico.role);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (EditTecnico.id !== undefined) {
        await atualizarTecnico(EditTecnico.id, {
          nome,
          email,
          role,
        });
        window.location.reload();
        toast.success("Técnico atualizado com sucesso!");
        onUpdate();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Erro ao atualizar preço.");
      console.error("Erro ao atualizar preço:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Editar Técnico</DialogTitle>
          <DialogDescription>Edite os dados do técnico.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              id="nome"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="col-span-3"
            />
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Senha
                        </Label>
                        <Input className="col-span-3" />
                    </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Gargo
            </Label>
            <Select
              onValueChange={(value) => setRole(value)}
              defaultValue={role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnico">Tecnico</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
            <Button
                className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300"
                onClick={handleSubmit} 
                type="submit"
            >
                Atualizar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

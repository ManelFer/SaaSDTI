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
import { Alocacao } from "@/models/alocacao.model";
import { Itens } from "@/models/itens.model";
import { Marcas } from "@/models/marcas.model";
import { Setor } from "@/models/setor.model";
import { atualizarAlocacao } from "@/services/alocacao.service";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AtualizacaoAlocProps {
  alocacaoItem: Alocacao;
  marcas: Marcas[];
  itens: Itens[];
  setores: Setor[];
  patrimonio: string;
  onUpdate: () => void;
}

export  function AtualizacaoAloc({
  alocacaoItem,
  marcas,
  itens,
  setores,
  patrimonio,
  onUpdate,
}: AtualizacaoAlocProps) {
  const [item_id, setItemId] = useState(alocacaoItem.equipamento_id);
  const [setor_id, setSetorId] = useState(alocacaoItem.setor_id);
  const [marca_id, setMarcaId] = useState(alocacaoItem.marcas_id);
  const [patrimonioAlocado, setPatrimonioAlocado] = useState(
    patrimonio || " sem patrimonio "
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (typeof alocacaoItem.id === "number") {
        await atualizarAlocacao(alocacaoItem.id, {
          equipamento_id: item_id,
          setor_id: setor_id,
          marcas_id: marca_id,
          patrimonio: patrimonioAlocado,
        });
        toast.success("Alocação atualizada com sucesso!");
        setOpen(false);
        onUpdate();
      } else {
        toast.error("ID da alocação inválido.");
      }
    } catch (error) {
      toast.error("Erro ao atualizar alocação.");
      console.error("Erro ao atualizar alocação:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Atualizar Alocação</DialogTitle>
          <DialogDescription>
            Use o formulário abaixo para atualizar a alocação.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item" className="text-right">
              Equipamento:
            </Label>
            <Select
              onValueChange={(value) => setItemId(Number(value))}
              value={String(item_id)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um item" />
              </SelectTrigger>
              <SelectContent>
                {itens.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marca" className="text-right">
              Marca:
            </Label>
            <Select
              onValueChange={(value) => setMarcaId(Number(value))}
              value={String(marca_id)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione uma marca" />
              </SelectTrigger>
              <SelectContent>
                {marcas.map((marca) => (
                  <SelectItem key={marca.id} value={String(marca.id)}>
                    {marca.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="setor" className="text-right">
              Setor:
            </Label>
            <Select
              onValueChange={(value) => setSetorId(Number(value))}
              value={String(setor_id)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
              <SelectContent>
                {setores.map((setor) => (
                  <SelectItem key={setor.id} value={String(setor.id)}>
                    {setor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patrimonio" className="text-right">
              Patrimônio:
            </Label>
            <Input
              id="patrimonio"
              value={patrimonioAlocado}
              onChange={(e) => setPatrimonioAlocado(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Atualizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { atualizarAlocacao } from "@/services/alocacao.service";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Equipamentos } from "@/components/layout/Equipamentos";
import { Marcas } from "@/components/layout/marcas";
import { Setor } from "../../CadastroOs/_components/setor";

interface AtualizacaoAlocProps {
  alocacaoItem: Alocacao;
  onUpdate: () => void;
}

export function AtualizacaoAloc({
  alocacaoItem,
  onUpdate,
}: AtualizacaoAlocProps) {
  const [equipamento_id, setEquipamentoId] = useState(
    String(alocacaoItem.equipamento_id)
  );
  const [setor_id, setSetorId] = useState(String(alocacaoItem.setor_id));
  const [marca_id, setMarcaId] = useState(String(alocacaoItem.marca_id));
  const [patrimonio, setPatrimonio] = useState(
    alocacaoItem.patrimonio || " sem patrimonio "
  );
  const [modelo, setModelo] = useState(alocacaoItem.modelo || "");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (typeof alocacaoItem.id === "number") {
        await atualizarAlocacao(alocacaoItem.id, {
          equipamento_id: Number(equipamento_id),
          setor_id: Number(setor_id),
          marca_id: Number(marca_id),
          patrimonio: patrimonio,
          modelo: modelo,
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
          <div className="grid grid-cols-1 gap-4">
            <Equipamentos
              value={equipamento_id}
              onChange={(value) => setEquipamentoId(value)}
            />
            <Marcas
              value={marca_id}
              onChange={(value) => setMarcaId(value)}
            />
            <Setor value={setor_id} onChange={(value) => setSetorId(value)} />
            <div>
              <Label htmlFor="patrimonio" className="mb-2">
                Patrimônio
              </Label>
              <Input
                id="patrimonio"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
                placeholder="Número de Patrimonio"
              />
            </div>
            <div>
              <Label htmlFor="modelo" className="mb-2">
                Modelo
              </Label>
              <Input
                id="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Modelo do equipamento"
              />
            </div>
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
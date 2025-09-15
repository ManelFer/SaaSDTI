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
import { Lixao } from "@/models/lixao.model";
import { Marcas } from "@/models/marcas.model";
import { Itens } from "@/models/itens.model";
import { atualizarLixao } from "@/services/lixao.service";
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

interface AtualizacaoLProps {
  lixaoItem: Lixao;
  marcas: Marcas[];
  itens: Itens[];
  onUpdate: () => void;
}

export function AtualizacaoL({ lixaoItem, marcas, itens, onUpdate }: AtualizacaoLProps) {
  const [item_id, setItemId] = useState(lixaoItem.item_id);
  const [marca_id, setMarcaId] = useState(lixaoItem.marca_id);
  const [modelo, setModelo] = useState(lixaoItem.modelo || "");
  const [numero_serie, setNumeroSerie] = useState(lixaoItem.numero_serie || "");
  const [patrimonio, setPatrimonio] = useState(lixaoItem.patrimonio || "");
  const [lote, setLote] = useState(lixaoItem.lote || "");
  const [quantidade, setQuantidade] = useState(lixaoItem.quantidade || 0);
  const [descricao, setDescricao] = useState(lixaoItem.descricao || "");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (lixaoItem.id !== undefined) {
        await atualizarLixao(lixaoItem.id, {
          item_id,
          marca_id,
          modelo,
          numero_serie,
          patrimonio,
          lote,
          quantidade,
          descricao,
          id: undefined
        });
        toast.success("Item do lixão atualizado com sucesso!");
        onUpdate(); // This will trigger a re-fetch in the parent
        setOpen(false); // Close the dialog
      } else {
        console.error("ID do item do lixão é indefinido.");
        toast.error("Erro: ID do item do lixão é indefinido.");
      }
    } catch (error) {
      console.error("Erro ao atualizar item do lixão:", error);
      toast.error("Erro ao atualizar item do lixão.");
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
          <DialogTitle>Atualizar Item do Lixão</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item" className="text-right">
              Equipamento
            </Label>
            <Select
              onValueChange={(value) => setItemId(Number(value))}
              defaultValue={String(item_id)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o equipamento" />
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marca" className="text-right">
              Marca
            </Label>
            <Select
              onValueChange={(value) => setMarcaId(Number(value))}
              defaultValue={String(marca_id)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a marca" />
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelo" className="text-right">
              Modelo
            </Label>
            <Input
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numero_serie" className="text-right">
              Nº Série
            </Label>
            <Input
              id="numero_serie"
              value={numero_serie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patrimonio" className="text-right">
              Patrimônio
            </Label>
            <Input
              id="patrimonio"
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lote" className="text-right">
              Lote
            </Label>
            <Input
              id="lote"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantidade" className="text-right">
              Quantidade
            </Label>
            <Input
              id="quantidade"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-600 text-white hover:bg-green-700 hover:scale-105 duration-300" type="submit" onClick={handleSubmit}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
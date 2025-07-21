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
import { Estoque } from "@/models/estoque.model";
import { Itens } from "@/models/itens.model";
import { Marcas } from "@/models/marcas.model";
import { atualizarEstoque } from "@/services/estoque.service";
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

interface AtualizacaoEProps {
  estoqueItem: Estoque;
  marcas: Marcas[];
  itens: Itens[];
  onUpdate: () => void;
}

export function AtualizacaoE({ estoqueItem, marcas, itens, onUpdate }: AtualizacaoEProps) {
  const [item_id, setItemId] = useState(estoqueItem.item_id);
  const [marca_id, setMarcaId] = useState(estoqueItem.marca_id);
  const [modelo, setModelo] = useState(estoqueItem.modelo || "");
  const [numero_serie, setNumeroSerie] = useState(estoqueItem.numero_serie || "");
  const [patrimonio, setPatrimonio] = useState(estoqueItem.patrimonio || "");
  const [lote, setLote] = useState(estoqueItem.lote || "");
  const [quantidade, setQuantidade] = useState(estoqueItem.quantidade || 0);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (estoqueItem.id !== undefined) {
        await atualizarEstoque(estoqueItem.id, {
          item_id,
          marca_id,
          modelo,
          numero_serie,
          patrimonio,
          lote,
          quantidade,
        });
        toast.success("Estoque atualizado com sucesso!");
        onUpdate(); // This will trigger a re-fetch in the parent
        setOpen(false); // Close the dialog
      }
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      toast.error("Erro ao atualizar estoque.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <SquarePen className="h-4 w-4 text-blue-600"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
                <DialogTitle>Atualizar Estoque</DialogTitle>
                <DialogDescription>
                    Atualize as informações do item no estoque.
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
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="marca" className="text-right">
                        Marca
                    </Label>
                    <Select
                        onValueChange={(value) => setMarcaId(Number(value))}
                        defaultValue={String(marca_id)}
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
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="modelo" className="text-right">
                        Modelo
                    </Label>
                    <Input
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        placeholder="Modelo"
                        className="col-span-3"
                    />  
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="numero_serie" className="text-right">
                        Número de Série
                    </Label>
                    <Input
                        id="numero_serie"
                        value={numero_serie}
                        onChange={(e) => setNumeroSerie(e.target.value)}
                        placeholder="Número de Série"
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
                        placeholder="Patrimônio"
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
                        placeholder="Lote"
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
                        placeholder="Quantidade"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300" type="submit" onClick={handleSubmit}>Atualizar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
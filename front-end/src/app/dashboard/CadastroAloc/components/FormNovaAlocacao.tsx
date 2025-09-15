"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Setor } from "../../CadastroOs/_components/setor";
import { Equipamentos } from "@/components/layout/Equipamentos";
import { Marcas } from "@/components/layout/marcas";

interface FormNovaAlocacaoProps {
  form: {
    Equipamento: string;
    Marcas: string;
    Patrimonio: string;
    Setor: string;
    Modelo: string;
  };
  handleChange: (key: string, value: string) => void;
  openDialog: () => void;
}

export function FormNovaAlocacao({
  form,
  handleChange,
  openDialog,
}: FormNovaAlocacaoProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:scale-105 bg-[#257432] text-white hover:bg-green-700 hover:text-white"
          >
            {" "}
            Nova Alocação
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Alocação</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar uma nova alocação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Equipamentos
                value={form.Equipamento}
                onChange={(value) => handleChange("Equipamento", value)}
              />
              <Marcas
                value={form.Marcas}
                onChange={(value) => handleChange("Marcas", value)}
              />
              <div>
                <Label htmlFor="patrimonio" className="mb-2">
                  Patrimonio
                </Label>
                <Input
                  id="patrimonio"
                  placeholder="Número de Patrimonio"
                  value={form.Patrimonio}
                  onChange={(e) => handleChange("Patrimonio", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="modelo" className="mb-2">
                  Modelo
                </Label>
                <Input
                  id="modelo"
                  placeholder="Modelo do Equipamento"
                  value={form.Modelo}
                  onChange={(e) => handleChange("Modelo", e.target.value)}
                />
              </div>
              <Setor
                value={form.Setor}
                onChange={(value) => handleChange("Setor", value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={openDialog}
              className="hover:scale-105 bg-[#257432] text-white hover:bg-green-700 hover:text-white"
            >
              Criar Alocação
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

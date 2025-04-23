"use client";
import { Setor } from "./_components/setor";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    osNumber: "",
    osDate: "",
    solicitante: "",
    setor: "",
    patrimonio: "",
    tipoFalha: "",
    solucaoTecnica: "",
    tecnicoResponsavel: "",
    osDateRecolhido: "",
    osDateDevolucao: "",
    osDateFechamento: "",
    status: "",
  });
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/ordens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Resposta do servidor:", data);
      alert("Ordem de serviço cadastrada com sucesso!");
      setIsDialogOpen(false);
      setForm({
        osNumber: "",
        osDate: "",
        solicitante: "",
        setor: "",
        patrimonio: "",
        tipoFalha: "",
        solucaoTecnica: "",
        tecnicoResponsavel: "",
        osDateRecolhido: "",
        osDateDevolucao: "",
        osDateFechamento: "",
        status: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      alert("Erro ao cadastrar ordem de serviço. Tente novamente.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Cadastro de Ordem de Serviço 📃
          </h1>
          <div className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300 text-white px-4 py-2 rounded-md">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300">
                  Cadastrar Ordem de Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                  <DialogTitle>Cadastro de Ordem de Serviço</DialogTitle>
                  <DialogDescription>
                    {" "}
                    Cadastre uma nova ordem de serviço{" "}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-6 py-4">
                  {/* First Column */}
                  <div className="space-y-4">
                    {/* Número da OS */}
                    <div className="space-y-2">
                      <Label htmlFor="os-number">Número da OS:</Label>
                      <Input
                        id="os-number"
                        placeholder="Número da OS"
                        value={form.osNumber}
                        onChange={(e) =>
                          handleChange("osNumber", e.target.value)
                        }
                      />
                    </div>

                    {/* Data e hora de abertura */}
                    <div className="space-y-2">
                      <Label htmlFor="os-date">Data e hora de abertura:</Label>
                      <Input
                        id="os-date"
                        type="datetime-local"
                        value={form.osDate}
                        onChange={(e) => handleChange("osDate", e.target.value)}
                      />
                    </div>

                    {/* Solicitante */}
                    <div className="space-y-2">
                      <Label htmlFor="solicitante">Solicitante:</Label>
                      <Input
                        id="solicitante"
                        placeholder="Nome do solicitante"
                        value={form.solicitante}
                        onChange={(e) =>
                          handleChange("solicitante", e.target.value)
                        }
                      />
                    </div>

                    {/* Setor / Fórum */}
                    <Setor value={form.setor} onChange={(value) => handleChange("setor", value)} />
                  </div>

                  {/* Second Column */}
                  <div className="space-y-4">
                    {/* Pat. Equipamento */}
                    <div className="space-y-2">
                      <Label htmlFor="patrimonio">Pat. Equipamento:</Label>
                      <Input
                        id="patrimonio"
                        placeholder="Patrimônio do equipamento"
                        value={form.patrimonio}
                        onChange={(e) =>
                          handleChange("patrimonio", e.target.value)
                        }
                      />
                    </div>

                    {/* Tipo de Falha */}
                    <div className="space-y-2">
                      <Label htmlFor="tipo-falha">Tipo de Falha:</Label>
                      <Input
                        id="tipo-falha"
                        placeholder="Tipo de falha"
                        value={form.tipoFalha}
                        onChange={(e) =>
                          handleChange("tipoFalha", e.target.value)
                        }
                      />
                    </div>

                    {/* Solução técnica */}
                    <div className="space-y-2">
                      <Label htmlFor="solucao-tecnica">Solução técnica:</Label>
                      <Textarea
                        id="solucao-tecnica"
                        placeholder="Solução técnica aplicada"
                        value={form.solucaoTecnica}
                        onChange={(e) =>
                          handleChange("solucaoTecnica", e.target.value)
                        }
                      />
                    </div>

                    {/* Técnico Responsável */}
                    <div className="space-y-2">
                      <Label htmlFor="tecnico">Técnico Responsável:</Label>
                      <Input id="tecnico" placeholder="Nome do técnico" value={form.tecnicoResponsavel} onChange={(e) => handleChange("tecnicoResponsavel", e.target.value)}/>
                    </div>
                  </div>

                  {/* Third Column */}
                  <div className="space-y-4">
                    {/* Data e hora do recolhimento */}
                    <div className="space-y-2">
                      <Label htmlFor="os-date-recolhido">
                        Data e hora do recolhimento:
                      </Label>
                      <Input
                        id="os-date-recolhimento"
                        type="datetime-local"
                        value={form.osDateRecolhido}
                        onChange={(e) =>
                          handleChange("osDateRecolhido", e.target.value)
                        }
                      />
                    </div>

                    {/* Data e hora do devolvimento */}
                    <div className="space-y-2">
                      <Label htmlFor="os-date-devolucao">
                        Data e hora do devolvimento:
                      </Label>
                      <Input
                        id="os-date-devolucao"
                        type="datetime-local"
                        value={form.osDateDevolucao}
                        onChange={(e) =>
                          handleChange("osDateDevolucao", e.target.value)
                        }
                      />
                    </div>

                    {/* Data e hora do fechamento */}
                    <div className="space-y-2">
                      <Label htmlFor="os-date-fechamento">
                        Data e hora do fechamento:
                      </Label>
                      <Input
                        id="os-date-fechamento"
                        type="datetime-local"
                        value={form.osDateFechamento}
                        onChange={(e) =>
                          handleChange("osDateFechamento", e.target.value)
                        }
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status">Status:</Label>
                      <Select
                        onValueChange={(value) => handleChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Resolvido">Resolvido</SelectItem>
                            <SelectItem value="Não resolvido">
                              Não resolvido
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 hover:scale-105 duration-300"
                  >
                    Salvar OS
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Lista de Ordens de Serviço</TableCaption>

            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="w-[100px]">Número da OS</TableHead>
                <TableHead>Data / Hora Abertura</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Setor / Fórum </TableHead>
                <TableHead>Pat. Equipamento</TableHead>
                <TableHead>Tipo de Falha</TableHead>
                <TableHead>Solução técnica</TableHead>
                <TableHead>Data / Hora Recolhido</TableHead>
                <TableHead>Data / Hora Devolvido</TableHead>
                <TableHead>Data / Hora do Fechamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Técnico Responsável
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">0001/2002</TableCell>
                <TableCell>2025-01-01 10:00:00</TableCell>
                <TableCell>João da Silva</TableCell>
                <TableCell>Setor de Controle</TableCell>
                <TableCell>ABC1234567890</TableCell>
                <TableCell>Falha no sistema</TableCell>
                <TableCell>Reinício do sistema</TableCell>
                <TableCell>2025-01-01 10:00:00</TableCell>
                <TableCell>2025-01-01 10:00:00</TableCell>
                <TableCell>2025-01-01 10:00:00</TableCell>
                <TableCell>Resolvido</TableCell>
                <TableCell className="text-right">José da Silva</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}

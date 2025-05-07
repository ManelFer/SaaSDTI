"use client";
import { Setor } from "./_components/setor";
import { use, useEffect, useState } from "react";
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
import { buscarOrdensServicos, createOrdens } from "@/services/ordens.service";
import { Ordem } from "@/models/ordem.model";
import { Setor  as SetorModel }from "@/models/setor.model";
import { buscarSetores } from "@/services/setores.service";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [setores, setSetores] = useState<SetorModel[]>([]);

  const [form, setForm] = useState({
    numero_os: "",
    data_abertura: "",
    solicitante: "",
    setor: "",
    patrimonio: "",
    tipo_falha: "",
    solucao_tecnica: "",
    tecnico_responsavel: "",
    data_recolhimento: "",
    data_devolucao: "",
    data_fechamento: "",
    status: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const cleanedForm = {
        ...form,
        setor_id: Number(form.setor),
        data_recolhimento: form.data_recolhimento || undefined,
        data_devolucao: form.data_devolucao || undefined,
        data_fechamento: form.data_fechamento || undefined,
      };
      console.log("Dados do formulário:", cleanedForm);
      
      const data = await createOrdens(cleanedForm);
      

      // const res = await fetch(API_URL + API_ROUTES.ORDENS, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // const data = await res.json();
      console.log("Resposta do servidor:", data);
      alert(data);
      setIsDialogOpen(false);
      setForm({
              numero_os: "",
              data_abertura: "",
              solicitante: "",
              setor: "",
              patrimonio: "",
              tipo_falha: "",
              solucao_tecnica: "",
              tecnico_responsavel: "",
              data_recolhimento: "",
              data_devolucao: "",
              data_fechamento: "",
              status: "",
            });
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      alert("Erro ao cadastrar ordem de serviço. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetSetores = async () => {
      const listaSetores = await buscarSetores();
      setSetores(listaSetores);
      console.log("Setores:", listaSetores);
    };
    fetSetores();
    
    const fetchOrdens = async () => {
      const ordensData = await buscarOrdensServicos();
      setOrdens(ordensData);
    };
    fetchOrdens();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Cadastro de Ordem de Serviço 📃
          </h1>
          <div className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300 text-white px-4 py-2 rounded-md shadow-md">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300 ">
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
                      <Label htmlFor="numero_os">Número da OS:</Label>
                      <Input
                        id="numero_os"
                        placeholder="Número da OS"
                        value={form.numero_os}
                        onChange={(e) =>
                          handleChange("numero_os", e.target.value)
                        }
                      />
                    </div>

                    {/* Data e hora de abertura */}
                    <div className="space-y-2">
                      <Label htmlFor="os-date">Data e hora de abertura:</Label>
                      <Input
                        id="os-date"
                        type="datetime-local"
                        value={form.data_abertura}
                        onChange={(e) => handleChange("data_abertura", e.target.value)}
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
                        value={form.tipo_falha}
                        onChange={(e) =>
                          handleChange("tipo_falha", e.target.value)
                        }
                      />
                    </div>

                    {/* Solução técnica */}
                    <div className="space-y-2">
                      <Label htmlFor="solucao-tecnica">Solução técnica:</Label>
                      <Textarea
                        id="solucao-tecnica"
                        placeholder="Solução técnica aplicada"
                        value={form.solucao_tecnica}
                        onChange={(e) =>
                          handleChange("solucao_tecnica", e.target.value)
                        }
                      />
                    </div>

                    {/* Técnico Responsável */}
                    <div className="space-y-2">
                      <Label htmlFor="tecnico">Técnico Responsável:</Label>
                      <Input
                        id="tecnico"
                        placeholder="Nome do técnico"
                        value={form.tecnico_responsavel}
                        onChange={(e) =>
                          handleChange("tecnico_responsavel", e.target.value)
                        }
                      />
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
                        value={form.data_recolhimento || ""}
                        onChange={(e) =>
                          handleChange("data_recolhimento", e.target.value)
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
                        value={form.data_devolucao || ""}
                        onChange={(e) =>
                          handleChange("data_devolucao", e.target.value)
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
                        value={form.data_fechamento}
                        onChange={(e) =>
                          handleChange("data_fechamento", e.target.value)
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
                <TableHead className="w-[100px]">numero_os</TableHead>
                <TableHead>data_abertura</TableHead>
                <TableHead>solicitante</TableHead>
                <TableHead> setor </TableHead>
                <TableHead>patrimonio</TableHead>
                <TableHead>tipo_falha</TableHead>
                <TableHead>solucao_tecnica</TableHead>
                <TableHead> data_recolhimento</TableHead>
                <TableHead>data_devolucao</TableHead>
                <TableHead>data_fechamento</TableHead>
                <TableHead>status</TableHead>
                <TableHead className="text-right">
                  tecnico_responsavel
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {ordens.map((ordem) => 
                <TableRow key={ordem.id}>
                  <TableCell className="font-medium">
                    {ordem.numero_os}
                  </TableCell>
                  <TableCell>{ordem.data_abertura}</TableCell>
                  <TableCell>{ordem.solicitante}</TableCell>
                  <TableCell>{setores.find(a => a.id == ordem.setor_id)?.nome}</TableCell>
                  <TableCell>{ordem.patrimonio}</TableCell>
                  <TableCell>{ordem.tipo_falha}</TableCell>
                  <TableCell>{ordem.solucao_tecnica}</TableCell>
                  <TableCell>{ordem.data_recolhimento}</TableCell>
                  <TableCell>{ordem.data_devolucao}</TableCell>
                  <TableCell>{ordem.data_fechamento}</TableCell>
                  <TableCell>{ordem.status}</TableCell>
                  <TableCell className="text-right">
                    {ordem.tecnico_responsavel}
                  </TableCell>
                </TableRow>
              )}

              {/* <TableRow>
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
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}

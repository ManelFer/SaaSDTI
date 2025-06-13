"use client";
import { Setor } from "./_components/setor";
import { Tecnicos } from "./_components/tecnicos";
import { useEffect, useState } from "react";
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
import { Setor as SetorModel } from "@/models/setor.model";
import { Tecnico as TecnicoModel } from "@/models/tecnico.model";
import { buscarSetores } from "@/services/setores.service";
import { buscarTecnicos } from "@/services/tecnicos.service";
import { formatDateTime } from "@/components/ui/DateTime";
import { Search } from "lucide-react";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [setores, setSetores] = useState<SetorModel[]>([]);
  const [tecnicos, setTecnicos] = useState<TecnicoModel[]>([]);

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
        tecnico_responsavel_id: Number(form.tecnico_responsavel),
        data_recolhimento: form.data_recolhimento || undefined,
        data_devolucao: form.data_devolucao || undefined,
        data_fechamento: form.data_fechamento || undefined,
      };

      await createOrdens(cleanedForm);
      
      // Atualiza a lista de ordens após cadastro
      const ordensData = await buscarOrdensServicos();
      setOrdens(ordensData);
      
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
      
      alert("Ordem de serviço cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      alert("Erro ao cadastrar ordem de serviço. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaTecnicos, listaSetores, ordensData] = await Promise.all([
          buscarTecnicos(),
          buscarSetores(),
          buscarOrdensServicos()
        ]);

        setTecnicos(listaTecnicos);
        setSetores(listaSetores);
        setOrdens(ordensData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ordensFiltradas = ordens.filter((ordem) => {
    const searchLower = search.toLowerCase();
    return (
      ordem.numero_os?.toLowerCase().includes(searchLower) ||
      ordem.solicitante?.toLowerCase().includes(searchLower) ||
      ordem.patrimonio?.toLowerCase().includes(searchLower) ||
      ordem.tipo_falha?.toLowerCase().includes(searchLower) ||
      ((setores.find((a) => a.id == ordem.setor_id)?.nome?.toLowerCase() ?? "").includes(searchLower)) ||
      (tecnicos.find((a) => a.id == ordem.tecnico_responsavel_id)?.nome?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Cadastro de Ordem de Serviço
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9 w-[300px]"
                placeholder="Buscar por OS, solicitante, patrimônio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
                    Cadastre uma nova ordem de serviço
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-6 py-4">
                  {/* Primeira coluna */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero_os">Número da OS:</Label>
                      <Input
                        id="numero_os"
                        placeholder="Número da OS"
                        value={form.numero_os}
                        onChange={(e) => handleChange("numero_os", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="os-date">Data e hora de abertura:</Label>
                      <Input
                        id="os-date"
                        type="datetime-local"
                        value={form.data_abertura}
                        onChange={(e) => handleChange("data_abertura", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solicitante">Solicitante:</Label>
                      <Input
                        id="solicitante"
                        placeholder="Nome do solicitante"
                        value={form.solicitante}
                        onChange={(e) => handleChange("solicitante", e.target.value)}
                        required
                      />
                    </div>

                    <Setor
                      value={form.setor}
                      onChange={(value) => handleChange("setor", value)}
                    />
                  </div>

                  {/* Segunda coluna */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patrimonio">Pat. Equipamento:</Label>
                      <Input
                        id="patrimonio"
                        placeholder="Patrimônio do equipamento"
                        value={form.patrimonio}
                        onChange={(e) => handleChange("patrimonio", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipo-falha">Tipo de Falha:</Label>
                      <Input
                        id="tipo-falha"
                        placeholder="Tipo de falha"
                        value={form.tipo_falha}
                        onChange={(e) => handleChange("tipo_falha", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solucao-tecnica">Solução técnica:</Label>
                      <Textarea
                        id="solucao-tecnica"
                        placeholder="Solução técnica aplicada"
                        value={form.solucao_tecnica}
                        onChange={(e) => handleChange("solucao_tecnica", e.target.value)}
                      />
                    </div>

                    <Tecnicos
                      value={form.tecnico_responsavel}
                      onChange={(value) => handleChange("tecnico_responsavel", value)}
                    />
                  </div>

                  {/* Terceira coluna */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="os-date-recolhimento">
                        Data e hora do recolhimento:
                      </Label>
                      <Input
                        id="os-date-recolhimento"
                        type="datetime-local"
                        value={form.data_recolhimento || ""}
                        onChange={(e) => handleChange("data_recolhimento", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="os-date-devolucao">
                        Data e hora do devolvimento:
                      </Label>
                      <Input
                        id="os-date-devolucao"
                        type="datetime-local"
                        value={form.data_devolucao || ""}
                        onChange={(e) => handleChange("data_devolucao", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="os-date-fechamento">
                        Data e hora do fechamento:
                      </Label>
                      <Input
                        id="os-date-fechamento"
                        type="datetime-local"
                        value={form.data_fechamento}
                        onChange={(e) => handleChange("data_fechamento", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status:</Label>
                      <Select
                        value={form.status}
                        onValueChange={(value) => handleChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Resolvido">Resolvido</SelectItem>
                            <SelectItem value="Não resolvido">
                              Não resolvido
                            </SelectItem>
                            <SelectItem value="Em andamento">
                              Em andamento
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
                    className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
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
                <TableHead className="w-[100px]">Número OS</TableHead>
                <TableHead>Abertura</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Patrimônio</TableHead>
                <TableHead>Tipo de Falha</TableHead>
                <TableHead>Solução</TableHead>
                <TableHead>Recolhimento</TableHead>
                <TableHead>Devolução</TableHead>
                <TableHead>Fechamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Técnico</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-4">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : ordensFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-4">
                    Nenhuma ordem encontrada
                  </TableCell>
                </TableRow>
              ) : (
                ordensFiltradas.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="font-medium">
                      {ordem.numero_os}
                    </TableCell>
                    <TableCell>{formatDateTime(ordem.data_abertura || "")}</TableCell>
                    <TableCell>{ordem.solicitante}</TableCell>
                    <TableCell>
                      {setores.find((a) => a.id == ordem.setor_id)?.nome}
                    </TableCell>
                    <TableCell>{ordem.patrimonio}</TableCell>
                    <TableCell>{ordem.tipo_falha}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {ordem.solucao_tecnica}
                    </TableCell>
                    <TableCell>{formatDateTime(ordem.data_recolhimento || "")}</TableCell>
                    <TableCell>{formatDateTime(ordem.data_devolucao || "")}</TableCell>
                    <TableCell>{formatDateTime(ordem.data_fechamento || "")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ordem.status === "Resolvido" 
                          ? "bg-green-100 text-green-800" 
                          : ordem.status === "Não resolvido" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {ordem.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {tecnicos.find((a) => a.id == ordem.tecnico_responsavel_id)?.nome}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
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
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Setor } from "./setor";
import { Tecnicos } from "./tecnicos";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { updateOrdem } from "@/services/ordens.service";

interface AtualizacaoOrdemProps {
  ordem: any;
  onUpdate: () => void;
}

export function AtualizacaoOrdem({ ordem, onUpdate }: AtualizacaoOrdemProps) {
    const [setor, setSetor] = useState(ordem.setor_id || "");
    const [tecnico, setTecnico] = useState(ordem.tecnico_responsavel_id || "");
    const [numero_os, setNumeroOs] = useState(ordem.numero_os || "");
    const [data_abertura, setDataAbertura] = useState(ordem.data_abertura || "");
    const [solicitante, setSolicitante] = useState(ordem.solicitante || "");
    const [patrimonio, setPatrimonio] = useState(ordem.patrimonio || "");
    const [tipo_falha, setTipoFalha] = useState(ordem.tipo_falha || "");
    const [solucao_tecnica, setSolucaoTecnica] = useState(ordem.solucao_tecnica || "");
    const [data_recolhimento, setDataRecolhimento] = useState(ordem.data_recolhimento || "");
    const [data_devolucao, setDataDevolucao] = useState(ordem.data_devolucao || "");
    const [data_fechamento, setDataFechamento] = useState(ordem.data_fechamento || "");
    const [status, setStatus] = useState(ordem.status || "");

    const handleSubmit = async () => {
        try {
            if (ordem.id !== undefined) {
                const updatedOrdem = {
                    setor_id: Number(setor),
                    tecnico_responsavel_id: Number(tecnico),
                    numero_os,
                    data_abertura,
                    solicitante,
                    patrimonio,
                    tipo_falha,
                    solucao_tecnica,
                    data_recolhimento: data_recolhimento || undefined,
                    data_devolucao: data_devolucao || undefined,
                    data_fechamento: data_fechamento || undefined,
                    status
                };

                await updateOrdem(ordem.id, updatedOrdem);
                toast.success("Ordem atualizada com sucesso!");
                onUpdate();
            }
        } catch (error) {
            console.error("Erro ao atualizar a ordem:", error);
            toast.error("Erro ao atualizar a ordem.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SquarePen className="h-4 w-4 text-blue-600" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Atualizar Ordem</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para atualizar a ordem de serviço.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="numero_os">Número da OS:</Label>
                            <Input id="numero_os" value={numero_os} onChange={(e) => setNumeroOs(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="os-date">Data e hora de abertura:</Label>
                            <Input id="os-date" type="datetime-local" value={data_abertura} onChange={(e) => setDataAbertura(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="solicitante">Solicitante:</Label>
                            <Input id="solicitante" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} />
                        </div>
                        <Setor value={setor} onChange={setSetor} />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="patrimonio">Pat. Equipamento:</Label>
                            <Input id="patrimonio" value={patrimonio} onChange={(e) => setPatrimonio(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipo-falha">Tipo de Falha:</Label>
                            <Input id="tipo-falha" value={tipo_falha} onChange={(e) => setTipoFalha(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="solucao-tecnica">Solução técnica:</Label>
                            <Textarea id="solucao-tecnica" value={solucao_tecnica} onChange={(e) => setSolucaoTecnica(e.target.value)} />
                        </div>
                        <Tecnicos value={tecnico} onChange={setTecnico} />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="os-date-recolhimento">Data e hora do recolhimento:</Label>
                            <Input id="os-date-recolhimento" type="datetime-local" value={data_recolhimento} onChange={(e) => setDataRecolhimento(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="os-date-devolucao">Data e hora do devolvimento:</Label>
                            <Input id="os-date-devolucao" type="datetime-local" value={data_devolucao} onChange={(e) => setDataDevolucao(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="os-date-fechamento">Data e hora do fechamento:</Label>
                            <Input id="os-date-fechamento" type="datetime-local" value={data_fechamento} onChange={(e) => setDataFechamento(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status:</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Resolvido">Resolvido</SelectItem>
                                    <SelectItem value="Não resolvido">Não resolvido</SelectItem>
                                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Setor } from "./setor";
import { Tecnicos } from "./tecnicos";
import { Ordem } from "@/models/ordem.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface FormState {
  numero_os: string;
  data_abertura: string;
  solicitante: string;
  setor: string;
  patrimonio: string;
  tipo_falha: string;
  solucao_tecnica: string;
  tecnico_responsavel: string;
  data_recolhimento: string;
  data_devolucao: string;
  data_fechamento: string;
  status: string;
  arquivo?: File | null;
}

interface OrdemServicoFormProps {
  initialData?: Ordem;
  onSubmit: (data: FormState) => Promise<void>;
  onClose: () => void;
}

export function OrdemServicoForm({
  initialData,
  onSubmit,
  onClose,
}: OrdemServicoFormProps) {
  const [form, setForm] = useState<FormState>({
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
    status: "Em andamento",
    arquivo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        numero_os: initialData.numero_os || "",
        data_abertura: initialData.data_abertura
          ? new Date(initialData.data_abertura).toISOString().slice(0, 16)
          : "",
        solicitante: initialData.solicitante || "",
        setor: initialData.setor_id?.toString() || "",
        patrimonio: initialData.patrimonio || "",
        tipo_falha: initialData.tipo_falha || "",
        solucao_tecnica: initialData.solucao_tecnica || "",
        tecnico_responsavel:
          initialData.tecnico_responsavel_id?.toString() || "",
        data_recolhimento: initialData.data_recolhimento
          ? new Date(initialData.data_recolhimento).toISOString().slice(0, 16)
          : "",
        data_devolucao: initialData.data_devolucao
          ? new Date(initialData.data_devolucao).toISOString().slice(0, 16)
          : "",
        data_fechamento: initialData.data_fechamento
          ? new Date(initialData.data_fechamento).toISOString().slice(0, 16)
          : "",
        status: initialData.status || "Em andamento",
        arquivo: null,
      });
    }
  }, [initialData]);

  const handleChange = (key: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const numeroOsRegex = /^\d{4}\/\d{4}$/;
    if (!numeroOsRegex.test(form.numero_os)) {
      toast.error(
        "O campo 'Número da OS' deve estar no formato AAAA/NNNN (Ano/Número)."
      );
      setIsSubmitting(false);
      return;
    }

    if (
      form.data_devolucao &&
      form.data_recolhimento &&
      new Date(form.data_devolucao) < new Date(form.data_recolhimento)
    ) {
      toast.error(
        "A data de devolução não pode ser anterior à data de recolhimento."
      );
      setIsSubmitting(false);
      return;
    }

    if (form.data_fechamento) {
      if (new Date(form.data_fechamento) < new Date(form.data_abertura)) {
        toast.error(
          "A data de fechamento não pode ser anterior à data de abertura."
        );
        setIsSubmitting(false);
        return;
      }
      if (
        form.data_recolhimento &&
        new Date(form.data_fechamento) < new Date(form.data_recolhimento)
      ) {
        toast.error(
          "A data de fechamento não pode ser anterior à data de recolhimento."
        );
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(form);
      onClose();
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-6 py-8 w-full">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numero_os">Número da OS:</Label>
            <Input
              id="numero_os"
              placeholder="Ex: 0001/2025"
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="os-date-recolhimento">
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
            <Label htmlFor="arquivo" >Anexar arquivo (PDF):</Label>
            <Input
              id="arquivo"
              type="file"
              accept=".pdf"
              onChange={(e) =>
                handleChange("arquivo", e.target.files ? e.target.files[0] : null)
              }
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
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                  <SelectItem value="Não resolvido">Não resolvido</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300 disabled:bg-gray-400"
        >
          {isSubmitting ? "Salvando..." : "Salvar OS"}
        </button>
      </div>
    </form>
  );
}
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Setor } from "./setor";
import { Tecnicos } from "./tecnicos";

interface CadastroOSFormProps {
  form: {
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
  };
  handleChange: (key: string, value: string) => void;
}

export function CadastroOSForm({ form, handleChange }: CadastroOSFormProps) {
  return (
    <div className="grid grid-cols-3 gap-6 py-8 w-full">
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
  );
}
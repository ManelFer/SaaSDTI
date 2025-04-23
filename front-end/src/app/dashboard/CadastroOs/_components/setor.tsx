import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SetorProps {
  value: string;
  onChange: (value: string) => void;
}
export function Setor({ value, onChange }: SetorProps) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="setor">Setor / Fórum:</Label>
      <Select
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o setor / fórum" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Setor / Fórum</SelectLabel>

            <SelectItem value="setor-forum-10">ADEPESE</SelectItem>

            <SelectItem value="setor-forum-70">
              ADM - Núc. 1º Atendimento
            </SelectItem>

            <SelectItem value="setor-forum-7">AdministraTivo</SelectItem>

            <SelectItem value="setor-forum-50">Almoxarifado</SelectItem>

            <SelectItem value="setor-forum-47">ASCOM</SelectItem>

            <SelectItem value="setor-forum-4">ASPLAN</SelectItem>

            <SelectItem value="setor-forum-67">Câmara Criminal</SelectItem>

            <SelectItem value="setor-forum-63">
              Central de Conciliação
            </SelectItem>

            <SelectItem value="setor-forum-59">Cerimonial</SelectItem>

            <SelectItem value="setor-forum-2">CIAPS Psicologia</SelectItem>

            <SelectItem value="setor-forum-66">CIAPS Social</SelectItem>

            <SelectItem value="setor-forum-11">Contabilidade</SelectItem>

            <SelectItem value="setor-forum-9">Contratos e Convênios</SelectItem>

            <SelectItem value="setor-forum-20">Coordenação Central</SelectItem>

            <SelectItem value="setor-forum-17">Corregedoria Geral</SelectItem>

            <SelectItem value="setor-forum-65">CRLS Administrativo</SelectItem>

            <SelectItem value="setor-forum-68">CRLS Técnica</SelectItem>

            <SelectItem value="setor-forum-3">Defensoria Geral</SelectItem>

            <SelectItem value="setor-forum-1">DTI</SelectItem>

            <SelectItem value="setor-forum-90">
              Escola da Defensoria Pública
            </SelectItem>

            <SelectItem value="setor-forum-6">Estágios</SelectItem>

            <SelectItem value="setor-forum-5">Financeiro</SelectItem>

            <SelectItem value="setor-forum-57">
              Fórum Barra dos Coqueiros
            </SelectItem>

            <SelectItem value="setor-forum-81">Fórum Boquim</SelectItem>

            <SelectItem value="setor-forum-42">Fórum Campo do Brito</SelectItem>

            <SelectItem value="setor-forum-44">Fórum Canidé</SelectItem>

            <SelectItem value="setor-forum-74">Fórum Capela</SelectItem>

            <SelectItem value="setor-forum-62">Fórum Carmópolis</SelectItem>

            <SelectItem value="setor-forum-89">Fórum Cristinápolis</SelectItem>

            <SelectItem value="setor-forum-31">Fórum D.I.A.</SelectItem>

            <SelectItem value="setor-forum-83">Fórum de Maruim</SelectItem>

            <SelectItem value="setor-forum-48">Fórum Estância</SelectItem>

            <SelectItem value="setor-forum-76">Fórum Frei Paulo</SelectItem>

            <SelectItem value="setor-forum-75">Fórum Gararu</SelectItem>

            <SelectItem value="setor-forum-87">Fórum Glória</SelectItem>

            <SelectItem value="setor-forum-30">
              Fórum Gumercindo Bessa
            </SelectItem>

            <SelectItem value="setor-forum-41">Fórum Itabaiana</SelectItem>

            <SelectItem value="setor-forum-80">Fórum Itabaianinha</SelectItem>

            <SelectItem value="setor-forum-72">Fórum Itaporanga</SelectItem>

            <SelectItem value="setor-forum-56">Fórum Japaratuba</SelectItem>

            <SelectItem value="setor-forum-82">Fórum Japoatã</SelectItem>

            <SelectItem value="setor-forum-43">Fórum Lagarto</SelectItem>

            <SelectItem value="setor-forum-71">Fórum Laranjeiras</SelectItem>

            <SelectItem value="setor-forum-37">Fórum Maracaju</SelectItem>

            <SelectItem value="setor-forum-34">
              Fórum Marcos Freire II
            </SelectItem>

            <SelectItem value="setor-forum-79">Fórum Neópolis</SelectItem>

            <SelectItem value="setor-forum-39">Fórum Orlando Dantas</SelectItem>

            <SelectItem value="setor-forum-36">
              Fórum Parque dos Faróis
            </SelectItem>

            <SelectItem value="setor-forum-58">Fórum Pirambu</SelectItem>

            <SelectItem value="setor-forum-45">Fórum Poço Redondo</SelectItem>

            <SelectItem value="setor-forum-86">Fórum Propriá</SelectItem>

            <SelectItem value="setor-forum-88">Fórum Propriá</SelectItem>

            <SelectItem value="setor-forum-84">Fórum Ribeirópolis</SelectItem>

            <SelectItem value="setor-forum-73">Fórum Salgado</SelectItem>

            <SelectItem value="setor-forum-40">Fórum Santa Maria</SelectItem>

            <SelectItem value="setor-forum-77">
              Fórum Santana de São Francisco
            </SelectItem>

            <SelectItem value="setor-forum-85">Fórum Santo Amaro</SelectItem>

            <SelectItem value="setor-forum-38">Fórum Santos Dumont</SelectItem>

            <SelectItem value="setor-forum-33">Fórum São Cristovão</SelectItem>

            <SelectItem value="setor-forum-61">Fórum Simão Dias</SelectItem>

            <SelectItem value="setor-forum-35">Fórum Socorro</SelectItem>

            <SelectItem value="setor-forum-46">Fórum Tobias Barreto</SelectItem>

            <SelectItem value="setor-forum-32">Fórum UFS</SelectItem>

            <SelectItem value="setor-forum-55">
              Juizado da Criança e Adolescente
            </SelectItem>

            <SelectItem value="setor-forum-12">Licitações</SelectItem>

            <SelectItem value="setor-forum-18">
              Núcleo 1º Atendimento
            </SelectItem>

            <SelectItem value="setor-forum-26">
              Núcleo da Criança e Adolescente
            </SelectItem>

            <SelectItem value="setor-forum-21">Núcleo da Saúde</SelectItem>

            <SelectItem value="setor-forum-29">
              Núcleo de Direitos Humanos e Inc. Social
            </SelectItem>

            <SelectItem value="setor-forum-22">
              Núcleo de Execuções Penais
            </SelectItem>

            <SelectItem value="setor-forum-25">
              Núcleo de Flagrantes e Presos Provisório
            </SelectItem>

            <SelectItem value="setor-forum-28">
              Núcleo de Inquéritos Administrativos
            </SelectItem>

            <SelectItem value="setor-forum-24">
              Núcleo de Movimento de Bairros
            </SelectItem>

            <SelectItem value="setor-forum-27">Núcleo do Consumidor</SelectItem>

            <SelectItem value="setor-forum-23">
              Núcleo do Direito da Mulher
            </SelectItem>

            <SelectItem value="setor-forum-13">Patrimônio</SelectItem>

            <SelectItem value="setor-forum-64">
              Peticionamento Integrado
            </SelectItem>

            <SelectItem value="setor-forum-51">Planejamento</SelectItem>

            <SelectItem value="setor-forum-54">Protocolo</SelectItem>

            <SelectItem value="setor-forum-52">Recepção Central</SelectItem>

            <SelectItem value="setor-forum-53">Recepção Sede</SelectItem>

            <SelectItem value="setor-forum-14">Recursos Humanos</SelectItem>

            <SelectItem value="setor-forum-8">Secretaria Geral</SelectItem>

            <SelectItem value="setor-forum-16">Subdefensoria Geral</SelectItem>

            <SelectItem value="setor-forum-15">Transportes</SelectItem>

            <SelectItem value="setor-forum-19">
              Triagem 1º Atendimento
            </SelectItem>

            <SelectItem value="setor-forum-69">Triagem Saúde</SelectItem>

            <SelectItem value="setor-forum-49">Tribunal De Justiça</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

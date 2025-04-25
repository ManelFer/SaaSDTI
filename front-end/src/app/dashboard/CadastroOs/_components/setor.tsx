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
import { useEffect, useState } from "react";
import { fetchSetores } from "@/services/setores.service";

interface SetorProps {
  value: string;
  onChange: (value: string) => void;
}

interface Setor {
  id: number;
  nome: string;
}

export function Setor({ value, onChange }: SetorProps) {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const dados = await fetchSetores() as Setor[];
        setSetores(dados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    carregarSetores();
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Carregando setores...</div>;
  }

  if (error) {
    return <div className="text-sm text-destructive">Erro: {error}</div>;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="setor">Setor / Fórum:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o setor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Setores disponíveis</SelectLabel>
            {setores.map((setor) => (
              <SelectItem key={setor.id} value={setor.id.toString()}>
                {setor.nome}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
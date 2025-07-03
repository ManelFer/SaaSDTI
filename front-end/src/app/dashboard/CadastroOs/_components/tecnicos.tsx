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
import { buscarTecnicos } from "@/services/tecnicos.service";

interface TecnicoProps {
    value: string;
    onChange: (value: string) => void;
}
interface Tecnico {
    id: number;
    nome: string;
}

export function Tecnicos ({value, onChange}: TecnicoProps) {
    const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarTecnicos = async () => {
            try {
                const dados = await buscarTecnicos() as Tecnico[];
                setTecnicos(dados);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        carregarTecnicos();
    }, []);

    if (loading) {
        return <div className="text-sm text-muted-foreground">Carregando técnicos...</div>;
    }

    if (error) {
        return <div className="text-sm text-destructive">Erro: {error}</div>;
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="tecnico">Técnico:</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione o técnico" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Técnico</SelectLabel>
                        {tecnicos.map((tecnico) => (
                            <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                                {tecnico.nome}
                                <p>teste</p>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );

}
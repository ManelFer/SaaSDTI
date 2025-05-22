import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../ui/select"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { buscarItens } from "@/services/itens.service"


interface EquipamentoProps {
    value: string
    onChange: (value: string) => void
}

interface Item {
    id: number
    nome: string
}

export function Equipamentos({ value, onChange }: EquipamentoProps) {
    const [itens, setItens] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarItens = async () => {
            try {
                const dados = await buscarItens() as Item[];
                setItens(dados);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        carregarItens();
    }, []);

    if (loading) {
        return <div className="text-sm text-muted-foreground">Carregando equipamentos...</div>;
    }

    if (error) {
        return <div className="text-sm text-destructive">Erro: {error}</div>;
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="equipamento">Equipamento:</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[180px]" id="equipamento">
                    <SelectValue placeholder="Equipamentos" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Equipamentos</SelectLabel>
                        {itens.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.nome}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

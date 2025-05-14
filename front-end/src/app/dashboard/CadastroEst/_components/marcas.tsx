// aqui vai ter os componentes de marcas
// Dell; Positivo; Lenovo; Samsung; Apple; Asus; Acer; Multilaser; HP; Motorola; Sony; LG; Philips; Microsoft; Xiaomi; Amazon; Google
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
import { buscarMarcas } from "@/services/marcas.service";

interface MarcaProps {
    value: string;
    onChange: (value: string) => void;
}
interface Marca {
    id: number;
    nome: string;
}


export function Marcas({ value, onChange }: MarcaProps) {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const carregarMarcas = async () => {
            try {
                const dados = await buscarMarcas() as Marca[];
                setMarcas(dados);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };
        carregarMarcas();
    }, []);
    if (loading) {
        return <div className="text-sm text-muted-foreground">Carregando marcas...</div>;
    }
    if (error) {
        return <div className="text-sm text-destructive">Erro: {error}</div>;
    }
    const marcasOptions = marcas.map((marca) => {
        return (
            <SelectItem key={marca.id} value={marca.id.toString()}>
                {marca.nome}
            </SelectItem>
        );
    })
    return (
        <div className="space-y-2">
            <Label htmlFor="marca">Marca:</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Marcas disponíveis</SelectLabel>
                        {marcas.map((marca) => (
                            <SelectItem key={marca.id} value={marca.id.toString()}>
                                {marca.nome}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
import { Input } from "@/components/ui/input";
import { buscarSetores} from "@/services/setores.service";
import { useEffect, useState } from "react";

interface Setor {
  id: string;
  nome: string;
}


interface FormUsuarioProps {
  form : {nome: string; email: string; setor: string; posicao: string;}
  setForm: React.Dispatch<React.SetStateAction<{
    nome: string;
    email: string;
    setor: string;
    posicao: string;
  }>>;
}

export function FormUsuario({ form, setForm }: FormUsuarioProps) {
    const [setores, setSetores] = useState<Setor[]>([]);
    
    useEffect (() => {
        async function fetchSetores() {
            try {
                const data = await buscarSetores();
                setSetores(
                    data.map((setor: any) => ({
                        id: String(setor.id ?? ""),
                        nome: setor.nome ?? ""
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar setores:", error);
            }
        }
        fetchSetores();
    }, []);
    return (
        <form>
            <div>
                <Input
                    id="nome"
                    placeholder="Nome completo"
                    className="border border-gray-300 rounded-md mb-2 w-full"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
            </div>
            <div>

                <Input
                    id="email"
                    placeholder="Email do usuário"
                    className="border border-gray-300 rounded-md mb-2 w-full"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
            <div>
                <select
                    id="setor"
                    className="border border-gray-300 rounded-md mb-2 w-full"
                    value={form.setor}
                    onChange={(e) => setForm({ ...form, setor: e.target.value })}
                >
                    <option value="" >Selecione um setor</option>
                    {setores.map((setor) => (
                        <option key={setor.id} value={setor.id}>
                            {setor.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Input
                    id="posicao"
                    placeholder="Posição do usuário"
                    className="border border-gray-300 rounded-md mb-2 w-full"
                    value={form.posicao}
                    onChange={(e) => setForm({ ...form, posicao: e.target.value })}
                />
            </div>
        </form>
    );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormSetorProps {
    form: {nome: string;}
    setForm: React.Dispatch<React.SetStateAction<{
        nome: string;
    }>>;
}

export function FormSetor({form, setForm}: FormSetorProps) {
    return (
        <div className="py-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="nome">Nome do setor:</Label>
                    <Input
                        id="nome"
                        placeholder="Nome do setor"
                        className="border border-gray-300 rounded-md mb-2 w-full"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}
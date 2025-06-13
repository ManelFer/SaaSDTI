
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormMarcasProps {
  form: { nome: string };
  setForm: React.Dispatch<React.SetStateAction<{ nome: string }>>;
}

export function FormMarcas({ form, setForm }: FormMarcasProps) {
  return (
    <div className="py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome da marca:</Label>
          <Input
            id="nome"
            value={form.nome}
            placeholder="Nome da marca..."
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

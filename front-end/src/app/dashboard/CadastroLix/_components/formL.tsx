import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Marcas } from "../../CadastroEst/_components/marcas";
import { Equipamentos } from "@/components/layout/Equipamentos";

interface FormProps {
  form: {
    nome: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    patrimonio: string;
    lote: string;
    descricao: string;
    quantidade: number;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export function Form({ form, setForm }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [id]: id === "quantidade" ? Number(value) : value,
    }));
  };

  const handleCustomChange = (field: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6 py-4">
      {/* Coluna da Esquerda */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Equipamentos
            value={form.nome}
            onChange={(value) => handleCustomChange("nome", value)}
          />
        </div>

        <div className="space-y-2">
          <Marcas
            value={form.marca}
            onChange={(value) => handleCustomChange("marca", value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo:</Label>
          <Input
            id="modelo"
            placeholder="Modelo do equipamento"
            value={form.modelo}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Coluna da Direita */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numero_serie">Número de série:</Label>
          <Input
            id="numero_serie"
            placeholder="Número de série do equipamento"
            value={form.numero_serie}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="patrimonio">Patrimônio:</Label>
          <Input
            id="patrimonio"
            placeholder="Patrimônio do equipamento"
            value={form.patrimonio}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lote">Lote:</Label>
          <Input
            id="lote"
            placeholder="Lote do equipamento"
            value={form.lote}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantidade">Quantidade:</Label>
          <Input
            id="quantidade"
            placeholder="Quantidade do equipamento"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição:</Label>
          <Input
            id="descricao"
            placeholder="Descrição de retirada"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

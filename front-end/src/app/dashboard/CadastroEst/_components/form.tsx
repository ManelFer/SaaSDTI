// components/Form.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Marcas } from "../../../../components/layout/marcas";
import { Equipamentos } from "@/components/layout/Equipamentos";

export interface EquipamentoForm {
  item_id: string;
  marca_id: string;
  modelo: string;
  numero_serie: string;
  patrimonio: string;
  lote: string;
  quantidade: number;
}

interface FormProps {
  form: EquipamentoForm;
  setForm: React.Dispatch<React.SetStateAction<EquipamentoForm>>;
}

export function Form({ form, setForm }: FormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: id === "quantidade" ? Number(value) : value,
    }));
  };

  const handleCustomChange = (field: keyof EquipamentoForm, value: string) => {
    setForm((prev) => ({
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
            value={form.item_id}
            onChange={(value) => handleCustomChange("item_id", value)}
          />
        </div>

        <div className="space-y-2">
          <Marcas
            value={form.marca_id}
            onChange={(value) => handleCustomChange("marca_id", value)}
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
            type="number"
            placeholder="Quantidade do equipamento"
            value={form.quantidade}
            min={0}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

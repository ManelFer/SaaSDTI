"use client"
import { useState } from "react";
import { FormNovaAlocacao} from "./FormNovaAlocacao"

export default function Header() {
  const [form, setForm] = useState({
    equipamento: "",
    marcas: "",
    Patrimonio: "",
    Setor: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Alocação</h2>
        <p className="text-sm text-gray-500">
          Controle de alocação dos equipamentos
        </p>
      </div>
      <FormNovaAlocacao form={form} handleChange={handleChange} />
    </div>
  );
}

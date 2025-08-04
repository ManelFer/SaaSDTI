"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import { CadastroOSDialog } from "../../../../CadastroOs/_components/CadastroOSDialog";

export function NovaOrdem() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    numero_os: "",
    data_abertura: "",
    solicitante: "",
    setor: "",
    patrimonio: "",
    tipo_falha: "",
    solucao_tecnica: "",
    tecnico_responsavel: "",
    data_recolhimento: "",
    data_devolucao: "",
    data_fechamento: "",
    status: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Aqui você pode enviar os dados para o backend, exibir toast etc.
    console.log("Dados da OS:", form);
    setIsOpen(false); // fecha o dialog após salvar
  };

  return (
    <Card className="p-4 mb-4 bg-blue-50 shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <File className="h-6 w-6 text-blue-500" />
        <button onClick={() => setIsOpen(true)}>
          <h4 className="text-sm font-bold text-blue-800">
            Cadastrar Nova ordem de serviço
          </h4>
        </button>
        <CadastroOSDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Card>
  );
}

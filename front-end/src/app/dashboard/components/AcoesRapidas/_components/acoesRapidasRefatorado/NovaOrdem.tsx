"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import { CadastroOSDialog } from "../../../../CadastroOs/_components/CadastroOSDialog";
import { FormState } from "../../../../CadastroOs/_components/OrdemServicoForm";
import { createOrdens } from "@/services/ordens.service";
import { toast } from "react-toastify";

export function NovaOrdem() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: FormState) => {
    try {
      const headers: Record<string, string> = {};

      
      const { arquivo, ...rest } = data;

      const cleanedData: Record<string, string | number | undefined> = {
        ...rest,
        setor_id: Number(data.setor),
        tecnico_responsavel_id: Number(data.tecnico_responsavel),
        data_recolhimento: data.data_recolhimento || undefined,
        data_devolucao: data.data_devolucao || undefined,
        data_fechamento: data.data_fechamento || undefined,
      };

      const formData = new FormData();

      Object.entries(cleanedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (arquivo) {
        formData.append("arquivo", arquivo);
      }

      await createOrdens(formData, headers);
      toast.success("Ordem de serviço cadastrada com sucesso!");
      setIsOpen(false);
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      toast.error("Erro ao cadastrar ordem de serviço. Tente novamente.");
      throw err;
    }
  };

  return (
    <Card className="p-4 mb-4 bg-blue-50 hover:bg-blue-100 transition shadow-md rounded-lg">
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
          handleSubmit={handleSubmit}
        />
      </div>
    </Card>
  );
}

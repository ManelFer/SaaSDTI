"use client";
import { useState, useEffect } from "react";
import { FormNovaAlocacao } from "./FormNovaAlocacao";
import { API_URL } from "@/constants/constante";
import { toast, Toaster } from "sonner";




export default function Header() {
  const [form, setForm] = useState({
    Equipamento: "",
    Marcas: "",
    Patrimonio: "",
    Setor: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAlocacaoSubmit = async () => {
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
    }

    // Validação 
    if (!form.Equipamento || !form.Marcas || !form.Patrimonio || !form.Setor) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/alocacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          equipamento_id: form.Equipamento,
          marca_id: form.Marcas,
          setor_id: form.Setor,
          patrimonio: form.Patrimonio,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao criar alocação");
      }

      toast.success("Alocação criada com sucesso!");
      setDialogOpen(false); 
      setForm({
        Equipamento: "",
        Marcas: "",
        Patrimonio: "",
        Setor: "",
      });
      window.location.reload();

    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Alocação</h2>
        <p className="text-sm text-gray-500">
          Controle de alocação dos equipamentos
        </p>
      </div>
      <FormNovaAlocacao
        form={form}
        handleChange={handleChange}
        openDialog={handleAlocacaoSubmit}
      />
      <Toaster richColors />
    </div>
  );
}

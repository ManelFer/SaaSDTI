"use client";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  buscarTecnicoPorId,
  atualizarTecnicoDados,
} from "@/services/tecnicos.service";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function MeuPerfilForm() {
  const { user } = useAuth(true);
  const [tecnicoNome, setTecnicoNome] = useState("");
  const [tecnicoEmail, setTecnicoEmail] = useState("");

  // Buscar dados do técnico
  useEffect(() => {
    const fetchTecnicoData = async () => {
      if (user?.id) {
        try {
          const tecnico = await buscarTecnicoPorId(user.id);
          setTecnicoNome(tecnico.nome || "");
          setTecnicoEmail(tecnico.email || "");
        } catch (error) {
          console.error("Erro ao buscar dados do técnico:", error);
          toast.error("Erro ao carregar dados do perfil.");
        }
      }
    };

    fetchTecnicoData();
  }, [user?.id]);

  // Função para atualizar os dados
  const handleSubmit = async () => {
    if (!user?.id) return;

    try {
      await atualizarTecnicoDados(user.id, {
        nome: tecnicoNome,
        email: tecnicoEmail,
      });
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar técnico:", error);
      toast.error("Erro ao atualizar dados.");
    }
  };

  return (
    <div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">Nome Completo</Label>
          <div className="relative">
            <User2 className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input
              className="pl-9"
              value={tecnicoNome}
              onChange={(e) => setTecnicoNome(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input
              className="pl-9"
              type="email"
              value={tecnicoEmail}
              onChange={(e) => setTecnicoEmail(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-[#257432] hover:bg-green-600 hover:scale-105 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16v4H7v-4M12 12v8m-6 0h12"
            />
          </svg>
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}

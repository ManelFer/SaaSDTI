"use client";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  buscarTecnicoPorId,
  atualizarTecnico,
} from "@/services/tecnicos.service";
import { Button } from "@/components/ui/button";

export function MeuPerfilForm() {
  const { user } = useAuth(true);
  const [tecnicoNome, setTecnicoNome] = useState<string | undefined>(undefined);
  const [tecnicoEmail, setTecnicoEmail] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchTecnicoData = async () => {
      if (user?.id) {
        try {
          const tecnico = await buscarTecnicoPorId(user.id);
          setTecnicoNome(tecnico.nome);
          setTecnicoEmail(tecnico.email);
        } catch (error) {
          console.error("Erro ao buscar dados do técnico:", error);
          setTecnicoNome("Nome não encontrado");
          setTecnicoEmail("Email não encontrado");
        }
      }
    };

    fetchTecnicoData();
  }, [user?.id]);

  useEffect(() => {
    const atualizarTecnico = async () => {
      if (user?.id) {
        try {
          const tecnico = await buscarTecnicoPorId(user.id);
          setTecnicoNome(tecnico.nome);
        } catch (error) {
          console.error("Erro ao buscar nome do técnico:", error);
          setTecnicoNome("Nome não encontrado");
        }
      }
    };

    atualizarTecnico();
  }, [user?.id]);

  return (
    <div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">Nome Completo</Label>
          <div className="relative">
            <User2 className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input className="pl-9" defaultValue={tecnicoNome} />
          </div>
        </div>

        <div>
          <Label className="mb-2">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
            <Input className="pl-9" type="email" defaultValue={tecnicoEmail} />
          </div>
        </div>
      </form>

      <div className="mt-6 flex justify-end">
        <Button className="bg-[#257432] hover:bg-green-600 hover:scale-105 flex items-center gap-2">
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

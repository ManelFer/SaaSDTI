"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { buscarTecnicoPorId } from "@/services/tecnicos.service";

export function PerfilAvatar() {
  const { user } = useAuth(true);
  const [tecnicoNome, setTecnicoNome] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchTecnicoNome = async () => {
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

    fetchTecnicoNome();
  }, [user?.id]);
  

  const getInitial = (name: string | undefined) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#257432]">
        <AvatarFallback>{getInitial(tecnicoNome || user?.email)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">{tecnicoNome || user?.email}</h2>
      </div>
    </div>
  );
}
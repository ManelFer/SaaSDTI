"use client";
import { Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { atualizarTecnicoDados } from "@/services/tecnicos.service";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function PerfilFormSenha() {
  const { user } = useAuth(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmNovaSenha, setConfirmNovaSenha] = useState("");

  //função para atualizar a senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    if (!currentPassword) {
      toast.error("Por favor, digite sua senha atual.");
      return;
    }

    if (novaSenha !== confirmNovaSenha) {
      toast.error("A nova senha e a confirmação da nova senha não coincidem.");
      return;
    }

    if (!novaSenha) {
      toast.error("Por favor, digite sua nova senha.");
      return;
    }

    try {
      await atualizarTecnicoDados(user.id, {
        senhaAtual: currentPassword,
        senha: novaSenha,
      });

      toast.success("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNovaSenha("");
      setConfirmNovaSenha("");
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      toast.error("Erro ao atualizar senha.");
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <Label className="mb-2">Senha Atual</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input
            className="pl-9"
            type="password"
            placeholder="Digite sua senha atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2">Nova Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input
            className="pl-9"
            type="password"
            placeholder="Digite sua nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2">Confirmar Nova Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input
            className="pl-9"
            type="password"
            placeholder="Confirme sua nova senha"
            value={confirmNovaSenha}
            onChange={(e) => setConfirmNovaSenha(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-2">
        <Button type="submit" className="w-full">
          Atualizar Senha
        </Button>
      </div>
    </form>
  );
}

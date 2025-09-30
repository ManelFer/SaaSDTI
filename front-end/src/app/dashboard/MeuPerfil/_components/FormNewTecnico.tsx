"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { cadastrarTecnico } from "@/services/tecnicos.service";
import { TecnicoCreate } from "@/models/tecnico.model";
import { toast } from "react-toastify";



export function FormNewTecnico() {
  const [form, setForm] = useState<TecnicoCreate>({
    nome: "",
    email: "",
    senha: "",
    role: "tecnico",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof TecnicoCreate, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await cadastrarTecnico(form);
      toast.success(`Técnico ${data.nome} cadastrado com sucesso!`);

      // limpa os campos
      setForm({
        nome: "",
        email: "",
        senha: "",
        role: " ",
      });
    } catch (err) {
      toast.error("Erro ao cadastrar técnico");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-4 mt-4" >
      <div className="grid gap-1">
        <Label htmlFor="nome">Nome completo</Label>
        <Input
          id="nome"
          placeholder="Nome completo..."
          type="text"
          value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="teste.teste@defensoria.se.def.br"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          placeholder="Senha..."
          type="password"
          value={form.senha}
          onChange={(e) => handleChange("senha", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="role">Função</Label>
        <Select
          value={form.role}
          onValueChange={(value) => handleChange("role", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma função" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="tecnico">Técnico</SelectItem>
              <SelectItem value="administrador">Administrador</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="mt-4 bg-[#257432] hover:bg-[#066333]"
        onClick={handleSubmit}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}

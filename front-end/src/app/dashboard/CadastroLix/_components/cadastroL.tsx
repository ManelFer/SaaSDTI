import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "./formL";
import { useEffect, useState } from "react";
import { Lixao } from "@/models/lixao.model";
import { createLixao, buscarLixao } from "@/services/lixao.service";

export function CadastroL() {
  const [isLixOpen, setLixOpen] = useState(false);
  const [lixao, setLixao] = useState<Lixao[]>([]);
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    modelo: "",
    numero_serie: "",
    patrimonio: "",
    lote: "",
    descricao: "",
    quantidade: 0,
  });

  const resetForm = () => {
    setForm({
      nome: "",
      marca: "",
      modelo: "",
      numero_serie: "",
      patrimonio: "",
      lote: "",
      descricao: "",
      quantidade: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        quantidade: Number(form.quantidade),
        id: 0,
      };

      console.log("Enviando dados:", payload);

      const novoItem = await createLixao(payload);
      setLixao((prev) => [...prev, novoItem]);

      alert("Equipamento cadastrado com sucesso!");
      resetForm();
      setLixOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar equipamento", error);
      alert("Erro ao cadastrar equipamento. Tente novamente.");
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await buscarLixao();
        setLixao(Array.isArray(dados) ? dados : [dados]);
      } catch (error) {
        console.error("Erro ao buscar dados do lixão:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div>
      <Dialog open={isLixOpen} onOpenChange={setLixOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300">
            Cadastro de Lixão
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Lixão</DialogTitle>
            <DialogDescription>
              Preencha os dados do equipamento danificado.
            </DialogDescription>
          </DialogHeader>

          <Form form={form} setForm={setForm} />

          <DialogFooter>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-[#257432] text-white hover:bg-[#066333] hover:scale-105 duration-300"
            >
              Salvar Equipamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

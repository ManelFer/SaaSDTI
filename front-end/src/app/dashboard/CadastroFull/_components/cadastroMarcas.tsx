import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormMarcas } from "./organisms/formMarcas";
import { useEffect, useState } from "react";
import { buscarMarcas, createMarcas } from "@/services/marcas.service";
import { Marcas } from "@/models/marcas.model";

export function CadastroMarcas() {
  const [isMarOpen, setMarOpen] = useState(false);
  const [marcas, setMarcas] = useState<Marcas[]>([]);
  const [form, setForm] = useState({
    nome: "",
  });

  const handleSubmit = async () => {
    try {
      const cleanedForm = {
        ...form,
      };
      console.log("Dados do formulário", cleanedForm);
      const data = await createMarcas(cleanedForm);
      console.log("Dados do estoque", data);
      alert("Marca cadastrada com sucesso!");
      setMarcas([...marcas, data]);
      setForm({
        nome: "",
      });
      setMarOpen(false); // Fecha o diálogo após salvar
    } catch (error) {
      console.error("Erro ao cadastrar marca", error);
      console.log("Dados do formulário", form);
      alert("Erro ao cadastrar marca. Tente novamente.");
    }
  };
  useEffect(() => {
    const fetchMarcas = async () => {
      const marcasData = await buscarMarcas();
      setMarcas(Array.isArray(marcasData) ? marcasData : [marcasData]);
    };
    fetchMarcas();
  }, []);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => setMarOpen(true)}
            className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
          >
            Cadastro de Marcas
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Marcas</DialogTitle>
            <DialogDescription>Cadastre marcas</DialogDescription>
            <FormMarcas form={form} setForm={setForm} />
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
            >
              Salvar Cadastro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

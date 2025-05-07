import { Button } from '@/components/ui/button';
import { Form } from './form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Estoque } from '@/models/estoque.model';
import { useEffect, useState } from 'react';
import { buscarEstoque, createEstoque } from '@/services/estoque.service';

export function Register() {
  const [isEstOpen, setEstOpen] = useState(false);
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [form, setForm] = useState({
    nome: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    patrimonio: '',
    lote: '',
    quantidade: 0,
  });

  const handleSubmit = async () => {
    try {
      const cleanedForm = {
        ...form,
        quantidade: Number(form.quantidade),
      };
      console.log("Dados do formulário", cleanedForm);
      const data = await createEstoque(cleanedForm);
      console.log("Dados do estoque", data);
      alert("Equipamento cadastrado com sucesso!");
      setEstoque([...estoque, data]);
      setForm({
        nome: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        patrimonio: '',
        lote: '',
        quantidade: 0,
      });
      setEstOpen(false); // Fecha o diálogo após salvar
    } catch (error) {
      console.error("Erro ao cadastrar equipamento", error);
      console.log("Dados do formulário", form);
      alert("Erro ao cadastrar equipamento. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchEstoque = async () => {
      const estoqueData = await buscarEstoque();
      setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
    };
    fetchEstoque();
  }, []);

  return (
    <div className='bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300'>
      <Dialog open={isEstOpen} onOpenChange={setEstOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setEstOpen(true)}
            className='bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300'
          >
            Cadastro de Equipamentos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cadastro de Equipamentos</DialogTitle>
            <DialogDescription>Cadastre um novo equipamento</DialogDescription>
          </DialogHeader>

          {/* Formulário controlado */}
          <Form form={form} setForm={setForm} />

          <DialogFooter>
            <Button
              type="button"
              onClick={handleSubmit}
              className='bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300'
            >
              Salvar Equipamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

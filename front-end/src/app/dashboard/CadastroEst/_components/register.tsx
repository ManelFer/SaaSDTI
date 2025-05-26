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
    item_id: '',
    marca_id: '',
    modelo: '',
    numero_serie: '',
    patrimonio: '',
    lote: '',
    quantidade: 0,
  });

  const resetForm = () => {
    setForm({
      item_id: '',
      marca_id: '',
      modelo: '',
      numero_serie: '',
      patrimonio: '',
      lote: '',
      quantidade: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        item_id: form.item_id,
        marca_id: form.marca_id,
        quantidade: Number(form.quantidade),
        id: 0,
      };
      console.log("Enviando dados:", payload);
      const novoItem = await createEstoque(payload);
      setEstoque((prev) => [...prev, novoItem]);
      alert("Equipamento cadastrado com sucesso!");
      resetForm();
      setEstOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar equipamento", error);
      alert("Erro ao cadastrar equipamento. Tente novamente.");
    }
  }

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        const estoqueData = await buscarEstoque();
        setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
      } catch (error) {
        console.error("Erro ao buscar estoque", error);
      }
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

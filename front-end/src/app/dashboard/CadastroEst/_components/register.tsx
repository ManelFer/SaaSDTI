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
import { Itens as ItensModel } from '@/models/itens.model';
import { Marcas } from '@/models/marcas.model';
import { buscarEstoque, createEstoque } from '@/services/estoque.service';
import { buscarItens } from '@/services/itens.service';
import { buscarMarcas } from '@/services/marcas.service';
import { toast } from 'react-toastify';

interface RegisterProps {
  isEstOpen: boolean;
  setEstOpen: (open: boolean) => void;
}

export function Register({ isEstOpen, setEstOpen }: RegisterProps) {
  const [, setEstoque] = useState<Estoque[]>([]);
  const [Loading, setLoading] = useState(false);
  const [, setItens] = useState<ItensModel[]>([]);
  const [, setMarca] = useState<Marcas[]>([]);
  const [form, setForm] = useState({
    item_id: '',
    marca_id: '',
    modelo: '',
    numero_serie: '',
    patrimonio: '',
    lote: '',
    quantidade: 0,
  });

  const handleSubmit = async () => {
    try {
      if (!form.item_id || !form.marca_id || !form.modelo || form.quantidade <= 0) {
        toast.error("Por favor, preencha todos os campos obrigatórios e certifique-se que a quantidade seja maior que zero.");
        return;
      }

      const payload = {
        ...form,
        item_id: Number(form.item_id),
        marca_id: Number(form.marca_id),
        quantidade: Number(form.quantidade),
      };

      console.log("Enviando dados:", payload);

      const data = await createEstoque(payload);

      console.log("Dados do estoque", data);
      toast.success("Equipamento cadastrado com sucesso!");
      setForm({
        item_id: '',
        marca_id: '',
        modelo: '',
        numero_serie: '',
        patrimonio: '',
        lote: '',
        quantidade: 0,
      });

      setEstOpen(false); // fecha o dialog após salvar
    } catch (err) {
      console.log("Erro de cadastro", err);
      toast.error("Erro ao cadastrar equipamento. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetEstoque = async () => {
      const listaItem = await buscarItens();
      const listaMarca = await buscarMarcas();

      setItens(listaItem);
      setMarca(listaMarca);
      setLoading(true);
    };
    fetEstoque();
  }, []);

  useEffect(() => {
    if (Loading) {
      const fetchEstoque = async () => {
        const estoqueData = await buscarEstoque();
        setEstoque(Array.isArray(estoqueData) ? estoqueData : [estoqueData]);
        setLoading(false);
      };
      fetchEstoque();
    }
  }, [Loading]);

  return (
    <Dialog open={isEstOpen} onOpenChange={setEstOpen}>
      <DialogTrigger asChild>
        {/* O trigger deve ser controlado externamente, então aqui pode ficar vazio ou removido */}
        <></>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Cadastro de Equipamentos</DialogTitle>
          <DialogDescription>Cadastre um novo equipamento</DialogDescription>
        </DialogHeader>

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
  );
}

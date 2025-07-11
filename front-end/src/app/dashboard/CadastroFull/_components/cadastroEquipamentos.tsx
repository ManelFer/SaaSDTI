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
import { FormEquipamentos } from "./organisms/formEquipamentos";
import { useEffect, useState } from "react";
import { buscarItens, createItens } from "@/services/itens.service";
import { Itens } from "@/models/itens.model";
import { toast } from "react-toastify";

export function CadastroEquipamentos() {
    const [, setIsOpen] = useState(false);
    const [itens, setItens] = useState<Itens[]>([]);
    const [form, setForm] = useState({
        nome: "",
    });

    const handleSubmit = async () => {
        try {
            toast.success("Equipamento cadastrado com sucesso!");
            const cleanedForm = {
                ...form,
            };
            const data = await createItens(cleanedForm);
            setItens([...itens, data]);
            setForm({
                nome: "",
            });
            setIsOpen(false); // Fecha o diálogo após salvar
        } catch (error) {
            toast.error("Erro ao cadastrar equipamento");
            console.error("Erro ao cadastrar equipamento", error);
            console.log("Dados do formulário", form);
            alert("Erro ao cadastrar equipamento. Tente novamente.");
        }
    };
    useEffect(() => {
        const fetchEquipamentos = async () => {
            const itensData = await buscarItens();
            setItens(Array.isArray(itensData) ? itensData : [itensData]);
        };
        fetchEquipamentos();
    }, []);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
                    >
                        Cadastro de Equipamentos
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de Equipamentos</DialogTitle>
                        <DialogDescription>
                            Preencha os dados do equipamento para cadastrá-lo.
                        </DialogDescription>
                    </DialogHeader>
                    <FormEquipamentos form={form} setForm={setForm} />
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333]"
                        >
                            Salvar Cadastro
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
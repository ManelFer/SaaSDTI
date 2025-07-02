// usar o data table
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
import { Form } from "./form";
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { retirarDoEstoque } from "@/services/estoqueRetirada.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Retirada() {
    const [form, setForm] = useState({
        item_id: "",
        marca_id: "",
        modelo: "",
        numero_serie: "",
        patrimonio: "",
        lote: "",
        quantidade: 0,
    });
    const [descricao, setDescricao] = useState("");

    const handleSubmit = async () => {
        try {
            await retirarDoEstoque({ ...form, item_id: Number(form.item_id), marca_id: Number(form.marca_id), descricao });
            alert("Retirada realizada com sucesso!");
        } catch (error) {
            alert("Erro ao realizar a retirada.");
        }
    };

    // const generatePdf = () => {
    //     const doc = new js ###terminar amanha###
    // }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300">
                        Retirada
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Retirada</DialogTitle>
                        <DialogDescription>Cadastre uma nova retirada</DialogDescription>
                        <Form form={form} setForm={setForm} />
                        {/* Descrição da retirada */}
                        <div className="space-y-2">
                            <Label htmlFor="descricao">
                                Descrição da retirada:
                            </Label>
                            <Textarea id="descricao" placeholder="Descrição da retirada" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        
                        <DialogFooter>
                            <Button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300" onClick={handleSubmit}>
                                Salvar Retirada
                            </Button>
                            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 hover:scale-105 duration-300">
                                Gerar Relatório
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

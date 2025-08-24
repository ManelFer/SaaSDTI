// Cadastrar Usuario e definir sua locação, exemplo: raquel, nucleo do consumidor, estagiaria

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
import { FormUsuario } from "./organisms/formCadastroUsuarios";
import { useState } from "react";

export function CadastroUsuario() {
    const [, setIsOpen] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        setor: "",
        posicao: "",
    });

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300"
                    >
                        Cadastro de Usuário
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de Usuário</DialogTitle>
                        <DialogDescription>
                            Preencha os dados do usuário para cadastrá-lo.
                        </DialogDescription>
                    </DialogHeader>
                    <FormUsuario form={form} setForm={setForm} />
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333]"
                        >
                            Salvar Cadastro
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

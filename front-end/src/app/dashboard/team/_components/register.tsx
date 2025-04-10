import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form } from './form';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"

export function Register() {
    return (
        <div className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Cadastro de Equipamentos
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de Equipamentos</DialogTitle>
                        <DialogDescription>Cadastre um novo equipamento</DialogDescription>
                    </DialogHeader>
                    {/* Iniciando as colunas do form */}
                    <Form />
                    <DialogFooter>
                        <Button type='submit' className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 hover:scale-105 duration-300'>
                            Salvar Equipamento
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

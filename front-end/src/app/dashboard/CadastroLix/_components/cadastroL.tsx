// usar o data table
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "./formL"
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";

export function CadastroL() {
    return(
        <div className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300">
                        Cadastro de Lixão
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de Lixão</DialogTitle>
                        <DialogDescription>Cadastre produtos danificados</DialogDescription>
                        <Form />
                        {/* Descrição da retirada */}
                        <div className="space-y-2">
                            <Label htmlFor="descricao">
                                Descrição do defeito:
                            </Label>
                            <Textarea id="descricao" placeholder="Descrição do produto" />
                        </div>
                        
                        <DialogFooter>
                            <Button type="submit" className="bg-[#257432] text-white px-4 py-2 rounded-md hover:bg-[#066333] hover:scale-105 duration-300">
                                Salvar Cadastro
                            </Button>
                            
                        </DialogFooter>
                    </DialogHeader>

                </DialogContent>
            </Dialog>
        </div>
    )
}

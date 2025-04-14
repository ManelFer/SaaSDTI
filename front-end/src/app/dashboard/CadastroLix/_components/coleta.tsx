// usar o data table
// Função da coleta é para apagar a tabela de lixão e gerar um relatorio
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

export function Coleta() {
    return(
        <div className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300">
                        Coleta
                    </Button>
                </DialogTrigger>
                
            </Dialog>
        </div>
    )
}

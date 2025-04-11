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
import { Form } from "./form"

export function Retirada() {
    return(
        <div className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300">
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
                        <Form />
                        <DialogFooter>
                            <Button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-105 duration-300">
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
    )
}

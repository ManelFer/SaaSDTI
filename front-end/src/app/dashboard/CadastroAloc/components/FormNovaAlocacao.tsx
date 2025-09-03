import {
    Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FormNovaAlocacao() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="hover:scale-105 bg-[#257432] text-white hover:bg-green-700 hover:text-white"> Nova Alocação</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nova Alocação</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para criar uma nova alocação.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="equipamento" className="mb-2">Equipamento</Label>
                                <Input id="equipamento" placeholder="Nome do equipamento" />
                            </div>

                            
                            <div>
                                <Label htmlFor="modelo" className="mb-2">Modelo</Label>
                                <Input id="modelo" placeholder="Nome do modelo" />
                            </div>

                            <div>
                                <Label htmlFor="serial" className="mb-2">Patrimonio</Label>
                                <Input id="serial" placeholder="Número de Patrimonio" />
                            </div>

                            <div>
                                <Label htmlFor="localizacao" className="mb-2">Setor</Label>
                                <Input id="localizacao" placeholder="Localização do equipamento" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="hover:scale-105 bg-[#257432] text-white hover:bg-green-700 hover:text-white">Criar Alocação</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
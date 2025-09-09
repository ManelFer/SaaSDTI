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
import { Itens } from "@/models/itens.model";
import { toast } from "react-toastify";

export function CadastroSetor() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
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
  );
}

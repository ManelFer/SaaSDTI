"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormNewTecnico} from "./FormNewTecnico";


export function TecnicoFormLabel() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300">
          Cadastrar Técnicos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cadastrar Técnico</DialogTitle>
          <DialogDescription>
            Cadastrar novos técnicos.
          </DialogDescription>
        </DialogHeader>
        <FormNewTecnico/>
      </DialogContent>
    </Dialog>
  );
}

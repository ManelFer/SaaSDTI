"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onAlocacaoCreated: () => Promise<void>;
  openDialog: () => void;
}

export function Header({ search, setSearch, openDialog }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Cadastro de Ordem de Serviço
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Buscar por OS, solicitante, patrimônio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={openDialog} className="bg-[#257432] hover:bg-[#066333] hover:scale-105 duration-300">
              Cadastrar Ordem de Serviço
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
}
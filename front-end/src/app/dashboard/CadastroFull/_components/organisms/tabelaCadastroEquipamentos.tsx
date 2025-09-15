"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { buscarItens, deleteItens } from "@/services/itens.service";
import { Itens } from "@/models/itens.model";
import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { NotepadText } from "lucide-react";

export function TabelaCadastroEquipamentos() {
  const [itens, setItens] = useState<Itens[]>([]);
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchItens = useCallback(async () => {
    setLoading(true);
    try {
      const itensData = await buscarItens();
      setItens(itensData);
    } catch (error) {
      toast.error("Falha ao buscar equipamentos.");
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchItens();
  }, [fetchItens]);

  const handleDelete = async (itemId: number) => {
    try {
      await deleteItens(itemId);
      toast.success("Equipamento deletado com sucesso!");
      fetchItens();
    } catch (error) {
      toast.error("Erro ao deletar o item. Tente novamente.");
      console.error("Erro ao deletar item:", error);
    }
  };
  const itensFiltrados = itens.filter((item) => item.nome?.toLocaleLowerCase().includes(search.toLowerCase()));
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <NotepadText className="h-4 w-4 text-blue-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Equipamentos Cadastrado</AlertDialogTitle>
          <AlertDialogDescription>
            Lista de equipamentos cadastrados no sistema.
          </AlertDialogDescription>
          <div className="overflow-x-auto">
            <Table>
                <TableBody>
                    {itensFiltrados.slice(0, 10).map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.nome}</TableCell>
                            <TableCell>
                                <button
                                    onClick={async () => {
                                        try {
                                            if (item.id !== undefined){
                                                await handleDelete(item.id);
                                                setItens(itens.filter((i) => i.id !== item.id))
                                            }
                                        } catch (error) {
                                            toast.error("Erro ao deletar o item. Tente novamente.");
                                            console.error("Erro ao deletar item:", error);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { buscarSetores, deleteSetores } from "@/services/setores.service";
import { Setor } from "@/models/setor.model";
import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import { NotepadText } from "lucide-react";

export function TabelaCadastroSetor() {
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, ] = useState(false);
    const [search, ] = useState("");

    useEffect(() => {
        const fetchSetores = async () => {
            const setoresData = await buscarSetores();
            setSetores(setoresData);
        };
        fetchSetores();
    }, []);

    useEffect(() => {
        if (loading) {
            const fetchSetores = async () => {
                const setoresData = await buscarSetores();
                setSetores(setoresData);
            };
            fetchSetores();
        }
    }, [loading]);

    const setoresFiltrados = setores.filter((setor) => setor.nome?.toLowerCase().includes(search.toLowerCase()));

    

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <NotepadText className="h-4 w-4 text-blue-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Setores Cadastrados</AlertDialogTitle>
                    <AlertDialogDescription>
                        Lista de setores cadastrados no sistema.
                    </AlertDialogDescription>
                    <div className="overflow-x-auto mt-4">
                        <Table>
                            <TableBody>
                                {setoresFiltrados.slice(0, 10).map((setor) => (
                                    <TableRow key={setor.id}>
                                        <TableCell className="font-medium">{setor.nome}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        if (setor.id !== undefined) {
                                                            await deleteSetores(setor.id);
                                                            setSetores(setores.filter((s) => s.id !== setor.id));
                                                            toast.success("Setor deletado com sucesso!");
                                                        }
                                                    } catch (error) {
                                                        toast.error("Erro ao deletar setor. Tente novamente.");
                                                        console.error("Erro ao deletar setor:", error);
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
    )
}
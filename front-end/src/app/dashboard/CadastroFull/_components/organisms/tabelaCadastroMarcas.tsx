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
import { buscarMarcas, deleteMarcas } from "@/services/marcas.service";
import { Marcas } from "@/models/marcas.model";
import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import { NotepadText } from "lucide-react";

export function TabelaCadastroMarcas() {
    const [marcas, setMarca] = useState<Marcas[]>([]);
    const [Loading, ] = useState(false);
    const [search, ] = useState("");

    useEffect(() => {
        const fetchMarcas = async () => {
            const marcasData = await buscarMarcas();
            setMarca(marcasData);
        };
        fetchMarcas();
    }, []);

    useEffect(() => {
        if (Loading) {
            const fetchMarcas = async () => {
                const marcasData = await buscarMarcas();
                setMarca(marcasData);
            };
            fetchMarcas();
        }
    }, [Loading]);

    const marcasFiltradas = marcas.filter((marca) => marca.nome?.toLowerCase().includes(search.toLowerCase()));

    // const handleDelete = async (marcaId: number) => {
    //     try {
    //         await deleteMarcas(marcaId);
    //         toast.success("Marca deletada com sucesso!");
    //         setLoading(true);
    //     } catch (error) {
    //         toast.error("Erro ao deletar marca. Tente novamente.");
    //         console.error("Erro ao deletar marca:", error);
    //     }
    // };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <NotepadText className="h-4 w-4 text-blue-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Marcas Cadastradas</AlertDialogTitle>
                    <AlertDialogDescription>
                        Lista de marcas cadastradas no sistema.
                    </AlertDialogDescription>
                    <div className="overflow-x-auto mt-4">
                        <Table>
                            <TableBody>
                                {marcasFiltradas.slice(0, 10).map((marca) => (
                                    <TableRow key={marca.id}>
                                        <TableCell className="font-medium">{marca.nome}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        if (marca.id !== undefined){
                                                            await deleteMarcas(marca.id);
                                                            setMarca(marcas.filter((m) => m.id !== marca.id));
                                                            toast.success("Marca deletada com sucesso!");
                                                        }
                                                    } catch (error) {
                                                        toast.error("Erro ao deletar marca. Tente novamente.");
                                                        console.error("Erro ao deletar marca:", error);
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

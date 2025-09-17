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
import { buscarUsuarios, deletarItemUsuarios} from "@/services/usuarios.service"
import { Usuarios } from "@/models/usuarios.model";
import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import { NotepadText } from "lucide-react";

export function TabelaCadastroUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
    const [Loading, ] = useState(false);
    const [search, ] = useState("");
    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuariosData = await buscarUsuarios()
            setUsuarios(usuariosData)
        }
        fetchUsuarios();
    }, [])

    useEffect(() => {
        if (Loading) {
            const fetchUsuarios = async () => {
                const usuariosData = await buscarUsuarios()
                setUsuarios(usuariosData)
            }
            fetchUsuarios();
        }
    }, [Loading])
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.nome?.toLowerCase().includes(search.toLowerCase()));
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <NotepadText className="h-4 w-4 text-blue-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Usuários Cadastrados</AlertDialogTitle>
          <AlertDialogDescription>
            Lista de usuários cadastrados no sistema.
          </AlertDialogDescription>
          <div className="overflow-x-auto mt-4">
            <Table>
              <TableBody>
                {usuariosFiltrados.slice(0, 10).map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>
                      <button
                        onClick={async () => {
                            try {
                                if (usuario.id !== undefined) {
                                    await deletarItemUsuarios(usuario.id);
                                    setUsuarios (usuarios.filter((u) => u.id !== usuario.id))
                                    toast.success("Usuário deletado com sucesso!");
                                }
                            } catch (error) {
                                toast.error("Erro ao deletar usuário. Tente novamente.");
                                console.error("Erro ao deletar usuário:", error);
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

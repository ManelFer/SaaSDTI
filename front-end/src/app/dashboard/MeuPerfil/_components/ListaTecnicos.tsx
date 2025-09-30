"use client"
import { Tecnico } from "@/models/tecnico.model"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deletarTecnico } from "@/services/tecnicos.service"
import { toast } from "react-toastify";


export function listaTecnicos({ tecnicos }: { tecnicos: Tecnico[] }) {
    return (
        <div className="p-4 rounded-lg border bg-white shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">
                        Nome completo
                    </h3>
                    <p className="text-sm text-gray-600">
                        Email do usuário
                    </p>
                    <p className="text-sm text-gray-600">
                        Função
                    </p>
                </div>
            </div>
        </div>
    )
}

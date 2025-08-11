"use client";
import { Lock } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function PerfilFormSenha() {
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label className="mb-2">Senha Atual</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" type="password" placeholder="Digite sua senha atual" />
                </div>
            </div>

            <div>
                <Label className="mb-2">Nova Senha</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" type="password" placeholder="Digite sua nova senha" />
                </div>
            </div>

            <div>
                <Label className="mb-2">Confirmar Nova Senha</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                    <Input className="pl-9" type="password" placeholder="Confirme sua nova senha" />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 flex items-left gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16v4H7v-4M12 12v8m-6 0h12" />
                    </svg>
                    Salvar Alterações
                </Button>
            </div>
        </form>
    )
}


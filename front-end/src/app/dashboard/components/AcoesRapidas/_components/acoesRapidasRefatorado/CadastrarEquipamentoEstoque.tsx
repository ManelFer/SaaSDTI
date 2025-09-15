"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Folder } from "lucide-react";


export function CadastrarEquipamentoEstoque() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="p-4 mb-4 bg-green-50 shadow-md rounded-lg cursor-pointer hover:bg-green-100 transition"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center space-x-4">
          <Folder className="h-6 w-6 text-green-500" />
          <h4 className="text-sm font-bold text-green-800">
            Cadastrar Equipamento no estoque
          </h4>
        </div>
      </Card>
    </>
  );
}

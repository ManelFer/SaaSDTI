"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buscarEstoque } from "@/services/estoque.service";
import { toast } from "react-toastify";

export function CardEstoque() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const estoque = await buscarEstoque();
        // Soma todas as quantidades
        const total = Array.isArray(estoque)? estoque.reduce((acc, item) => acc + (item.quantidade || 0), 0) : estoque.quantidade;
        setQuantidadeTotal(total);
      } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        toast.error("Erro ao buscar estoque");
      }
    };

    carregarEstoque();
  }, []); 

  return (
    <Card className="flex items-center justify-between p-6 bg-green-50 border border-green-200">
      <div className="flex items-center space-x-4">
        <Monitor className="h-6 w-6 text-green-600" />
        <div>
          <h3 className="text-lg font-semibold text-green-800">Total no Estoque</h3>
        </div>
      </div>
      <span className="text-xl font-bold text-green-800">{quantidadeTotal}</span>
    </Card>
  );
}

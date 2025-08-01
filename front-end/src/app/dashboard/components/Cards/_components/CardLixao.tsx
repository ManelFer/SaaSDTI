"use client";
import { useEffect, useState } from "react";
import {Trash} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { buscarLixao } from "@/services/lixao.service";
import { toast } from "react-toastify";

export function CardLixao() {
  const [quantidadeLixao, setQuantidadeLixao] = useState<number>(0);
  useEffect(() => {
    const carregarLixao = async () => {
      try {
        const lixao = await buscarLixao() ;
        const total = lixao.reduce((acc, item) => acc + (item.quantidade ?? 0), 0);
        setQuantidadeLixao(total);
      } catch (error) {
        console.error("Erro ao buscar lixão:", error);
        toast.error("Erro ao buscar lixão");
      }
    }

    carregarLixao();
  })
  return (
    <Card className="flex items-center justify-between p-6 bg-blue-50 border border-blue-200">
      <div className="flex items-center space-x-4">
        <Trash className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-blue-800">Lixão</h3>
        </div>
      </div>
      <span className="text-xl font-bold text-blue-800">{quantidadeLixao}</span>
    </Card>
  );
}
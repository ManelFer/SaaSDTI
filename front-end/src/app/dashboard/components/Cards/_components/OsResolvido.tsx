"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buscarOrdensServicos } from "@/services/ordens.service";
import { toast } from "react-toastify";

export function CardOsResolvido() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  useEffect(() => {
    const carregarOrdens = async () => {
      try {
        const ordens = await buscarOrdensServicos();
        setQuantidadeTotal(ordens.length);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
        toast.error("Erro ao buscar ordens");
      }
    };
    carregarOrdens();
  }, []);
  return (
    <Card className="flex items-center justify-between p-6 bg-green-50 border border-green-200">
      <div className="flex items-center space-x-4">
        <CheckCircle className="h-6 w-6 text-green-600" />
        <div>
          <h3 className="text-lg font-semibold text-green-800">OS Públicadas</h3>
        </div>
      </div>
      <span className="text-xl font-bold text-green-800">{quantidadeTotal}</span>
    </Card>
  );
}
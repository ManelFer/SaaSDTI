import { User, Package } from "lucide-react";

type MovimentacaoProps = {
  setor: string;
  Equipamento: string;
  Marca: string;
  Modelo: string;
  responsavel: string;
  patrimonio: number;
  tipo: "Alocado" | "Leilão" | "Estoque" ;
};

export default function MovimentacaoCard({
  setor,
  Equipamento,
  Marca,
  Modelo,
  responsavel,
  patrimonio,
  tipo,
}: MovimentacaoProps) {
  const badgeColors = {
    Alocado: "bg-blue-100 text-blue-700",
    Leilão: "bg-orange-100 text-orange-700",
    Estoque: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {setor} <span className="mx-2">↔</span> {Equipamento}
          </h3>
          <p className="text-sm text-gray-600">{Equipamento} {Marca} {Modelo}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            badgeColors[tipo]
          }`}
        >
          {tipo}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> {responsavel}
          </span>
          <span className="flex items-center gap-1">
            <Package className="h-4 w-4" /> Patrimonio: {patrimonio}
          </span>
        </div>
      </div>
    </div>
  );
}
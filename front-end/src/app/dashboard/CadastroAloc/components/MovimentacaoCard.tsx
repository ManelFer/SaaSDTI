import { Package, Calendar } from "lucide-react";


type MovimentacaoProps = {
  id: number;
  setor_nome: string;
  equipamento_nome: string;
  marca_nome: string;
  patrimonio: string; 
  created_at: string;
};

export default function MovimentacaoCard({
  setor_nome,
  equipamento_nome,
  marca_nome,
  patrimonio,
  created_at,
}: MovimentacaoProps) {
  const tipo = "Alocado"; 

  const badgeColors = {
    Alocado: "bg-blue-100 text-blue-700",
    Leilão: "bg-orange-100 text-orange-700", 
    Estoque: "bg-green-100 text-green-700", 
  };

  const formattedDate = new Date(created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {setor_nome} <span className="mx-2">↔</span> {equipamento_nome}
          </h3>
          <p className="text-sm text-gray-600">
            {equipamento_nome} {marca_nome}
          </p>
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
            <Package className="h-4 w-4" /> Patrimonio: {patrimonio}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formattedDate} - <p className="mx-2 opacity-50">Data de cadastro</p>
          </span>
        </div>
      </div>
    </div>
  );
}

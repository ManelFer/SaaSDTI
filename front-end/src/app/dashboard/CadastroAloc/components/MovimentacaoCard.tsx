import { User, Package, Calendar } from "lucide-react";

// Tipo atualizado para refletir os dados da API de alocação
type MovimentacaoProps = {
  id: number;
  setor_nome: string;
  equipamento_nome: string;
  marca_nome: string;
  patrimonio: string; // Patrimonio é uma string no backend
  created_at: string;
};

export default function MovimentacaoCard({
  setor_nome,
  equipamento_nome,
  marca_nome,
  patrimonio,
  created_at,
}: MovimentacaoProps) {
  const tipo = "Alocado"; // Hardcoded, pois todos os itens desta lista são alocados

  const badgeColors = {
    Alocado: "bg-blue-100 text-blue-700",
    Leilão: "bg-orange-100 text-orange-700", // Mantido para consistência de design
    Estoque: "bg-green-100 text-green-700", // Mantido para consistência de design
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
            <Calendar className="h-4 w-4" /> {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}

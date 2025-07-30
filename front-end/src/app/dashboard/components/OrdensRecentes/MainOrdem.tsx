import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { buscarOrdensServicos } from "@/services/ordens.service";
import { Ordem } from "@/models/ordem.model";

export function MainOrdem() {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrdens() {
      try {
        const dados = await buscarOrdensServicos();
        setOrdens(dados);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      }
    }

    fetchOrdens();
  }, []);

  const filteredOrdens = ordens.filter((ordem) =>
    ordem.solicitante?.toLowerCase().includes(search.toLowerCase()) ||
    ordem.setor_id?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ordens Recentes</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="text"
        placeholder="Buscar por solicitante ou setor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-400"
      />

      <div className="space-y-4">
        {filteredOrdens.slice(0, 3).length > 0 ? (
          filteredOrdens.slice(0, 3).map((ordem) => (
            <div
              key={ordem.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">OS #{ordem.id}</h3>
                <p className="text-sm text-gray-600">
                  {ordem.solicitante} • {ordem.setor_id}
                </p>
                <p className="text-xs text-gray-500">
                  Técnico: {ordem.tecnico_responsavel_id} • Status: {ordem.status}
                </p>
              </div>
              {/* Você pode adicionar um badge de status aqui */}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma ordem encontrada.</p>
        )}
      </div>
    </div>
  );
}

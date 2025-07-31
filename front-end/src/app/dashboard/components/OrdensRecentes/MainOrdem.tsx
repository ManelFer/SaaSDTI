import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { buscarOrdensServicos } from "@/services/ordens.service";
import { buscarSetores } from "@/services/setores.service";
import { buscarTecnicos } from "@/services/tecnicos.service";
import { Ordem } from "@/models/ordem.model";
import { Setor } from "@/models/setor.model";
import { Tecnico } from "@/models/tecnico.model";


export function MainOrdem() {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAll() {
      try {
        const [ordensData, setoresData, tecnicosData] = await Promise.all([
          buscarOrdensServicos(),
          buscarSetores(),
          buscarTecnicos(),
        ]);
        console.log("Técnico", tecnicosData);
        setOrdens(ordensData);
        setSetores(setoresData);
        setTecnicos(tecnicosData);
        console.log("Técnicos:", tecnicosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchAll();
  }, []);

  function getSetorNome(id?: number) {
    return setores.find((s) => s.id === id)?.nome || "Setor desconhecido";
  }

  function getTecnicoNome(id?: number) {
    console.log("Buscando técnico com id:", id);
    const tecnico = tecnicos.find((t) => t.id === id);
    console.log("Encontrado técnico:", tecnico);
    return tecnico?.nome || "Técnico desconhecido";
  }

  function getOrdemNome(id: number | null | undefined) {
    return ordens.find((o) => o.id === id)?.numero_os || "OS desconhecida";
  }

  const filteredOrdens = ordens.filter(
    (ordem) =>
      ordem.solicitante?.toLowerCase().includes(search.toLowerCase()) ||
      getSetorNome(ordem.setor_id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      getTecnicoNome(ordem.tecnico_responsavel_id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (ordem.id !== null && ordem.id !== undefined
        ? getOrdemNome(ordem.id).toLowerCase().includes(search.toLowerCase())
        : false)
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
                <h3 className="font-medium text-gray-900">
                  {getOrdemNome(ordem.id)}
                </h3>
                <p className="text-sm text-gray-600">
                  {ordem.solicitante} • {getSetorNome(ordem.setor_id)}
                </p>
                <p className="text-xs text-gray-500">
                  Técnico: {getTecnicoNome(ordem.tecnico_responsavel_id)} •
                  Status: {ordem.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma ordem encontrada.</p>
        )}
      </div>
    </div>
  );
}

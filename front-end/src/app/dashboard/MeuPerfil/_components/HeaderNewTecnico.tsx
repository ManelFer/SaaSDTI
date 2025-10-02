"use client";
import { useEffect, useState } from "react";
import { TecnicoFormLabel } from "./TecnicoFormLabel";
import { buscarTecnico, deletarTecnico } from "@/services/tecnicos.service";
import { EditarNewTecnico} from "@/app/dashboard/MeuPerfil/_components/EditarNewTecnico"
import { toast } from "react-toastify";
import { Tecnico } from "@/models/tecnico.model";



export function NewTecnico() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const data = await buscarTecnico();
        setTecnicos(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Erro ao buscar técnicos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  //update
  const handleUpdate = () => {
    setLoading(true);
  }

  const handleDelete = async (tecnicoId: number) => {
    try {
      await deletarTecnico(tecnicoId);
      toast.success("Tecnico deletado com sucesso!");
      setTecnicos(tecnicos.filter((tecnico) => tecnico.id !== tecnicoId));
    } catch (error) {
      toast.error("Erro ao deletar tecnico.");
      console.error("Erro ao deletar tecnico:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h1 className="text-2xl font-bold text-gray-800 col-span-2">
        Cadastro de Técnicos
      </h1>
      <div className="flex justify-end col-span-2">
        <TecnicoFormLabel />
      </div>

      {loading && <p className="col-span-2">Carregando...</p>}

      {!loading &&
        tecnicos.map((tecnico) => (
          <div
            key={tecnico.id}
            className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {tecnico.nome ? tecnico.nome[0]: "?"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tecnico.nome}</h3>
                  <p className="text-sm text-gray-600">{tecnico.email}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Função:</span>{" "}
                    {tecnico.role}
                  </p>
                </div>
              </div>

              {/* Badge de Função */}
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {tecnico.role}
              </span>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 mt-4 text-sm">
              <button className="text-blue-600 hover:underline">
                <EditarNewTecnico
                  EditTecnico={tecnico}
                  onUpdate={handleUpdate}
                />
              </button>
              <button 
                onClick={() => {
                  if (tecnico.id !== undefined) {
                    handleDelete(tecnico.id);
                  }
                }}
                className="text-red-600 hover:underline" >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

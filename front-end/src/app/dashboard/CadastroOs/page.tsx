"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Ordem } from "@/models/ordem.model";
import { Setor as SetorModel } from "@/models/setor.model";
import { Tecnico as TecnicoModel } from "@/models/tecnico.model";
import {
  buscarOrdensServicos,
  createOrdens,
} from "@/services/ordens.service";
import { buscarSetores } from "@/services/setores.service";
import { buscarTecnicos } from "@/services/tecnicos.service";
import { OrdemDeServicoTable } from "./_components/OrdemDeServicoTable";
import { Header } from "./_components/Header";
import { CadastroOSDialog } from "./_components/CadastroOSDialog";
import { toast } from "react-toastify";
import { FormState } from "./_components/OrdemServicoForm";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [setores, setSetores] = useState<SetorModel[]>([]);
  const [tecnicos, setTecnicos] = useState<TecnicoModel[]>([]);

  const fetchOrdens = async () => {
    try {
      const ordensData = await buscarOrdensServicos();
      setOrdens(ordensData);
    } catch (error) {
      console.error("Erro ao buscar ordens de serviço:", error);
      toast.error("Erro ao carregar a lista de ordens de serviço.");
    }
  };

  const handleSubmit = async (data: FormState) => {
    try {
      let payload: FormData | string;
      const headers: Record<string, string> = { "Content-Type": "application/json" };

      const cleanedData = {
        ...data,
        setor_id: Number(data.setor),
        tecnico_responsavel_id: Number(data.tecnico_responsavel),
        data_recolhimento: data.data_recolhimento || undefined,
        data_devolucao: data.data_devolucao || undefined,
        data_fechamento: data.data_fechamento || undefined,
      };
      delete cleanedData.arquivo; 

      if (data.arquivo) {
        const formData = new FormData();
        Object.entries(cleanedData).forEach(([key, value]) => {
          // const value = (cleanedData as any)[key];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        formData.append("arquivo", data.arquivo);
        payload = formData;
        delete headers["Content-Type"]; 
      } else {
        payload = JSON.stringify(cleanedData);
      }

      await createOrdens(payload, headers);
      toast.success("Ordem de serviço cadastrada com sucesso!");
      handleOrdemUpdated(); 
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      toast.error("Erro ao cadastrar ordem de serviço. Tente novamente.");
      throw err; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitialLoading(true);
        const [listaTecnicos, listaSetores, ordensData] = await Promise.all([
          buscarTecnicos(),
          buscarSetores(),
          buscarOrdensServicos(),
        ]);

        setTecnicos(listaTecnicos);
        setSetores(listaSetores);
        setOrdens(ordensData);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
        toast.error("Falha ao carregar dados do servidor.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      fetchOrdens().finally(() => setLoading(false));
    }
  }, [loading]);

  const handleOrdemDeleted = (id: number) => {
    setOrdens(ordens.filter((ordem) => ordem.id !== id));
  };

  const handleOrdemUpdated = () => {
    setLoading(true);
  };

  const ordensFiltradas = ordens.filter((ordem) => {
    const searchLower = search.toLowerCase();
    return (
      ordem.numero_os?.toLowerCase().includes(searchLower) ||
      ordem.solicitante?.toLowerCase().includes(searchLower) ||
      ordem.patrimonio?.toLowerCase().includes(searchLower) ||
      ordem.tipo_falha?.toLowerCase().includes(searchLower) ||
      (setores.find((a) => a.id == ordem.setor_id)?.nome?.toLowerCase() ?? "")
        .includes(searchLower) ||
      tecnicos
        .find((a) => a.id == ordem.tecnico_responsavel_id)
        ?.nome?.toLowerCase()
        .includes(searchLower)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <Header
          search={search}
          setSearch={setSearch}
          openDialog={() => setIsDialogOpen(true)} onAlocacaoCreated={function (): Promise<void> {
            throw new Error("Function not implemented.");
          } }        />
        <CadastroOSDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          handleSubmit={handleSubmit}
        />
        <OrdemDeServicoTable
          loading={initialLoading}
          ordens={ordensFiltradas}
          setores={setores}
          tecnicos={tecnicos}
          onOrdemDeleted={handleOrdemDeleted}
          onOrdemUpdated={handleOrdemUpdated}
        />
      </div>
    </DashboardLayout>
  );
}

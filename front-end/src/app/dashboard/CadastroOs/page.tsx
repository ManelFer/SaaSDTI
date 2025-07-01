"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Ordem } from "@/models/ordem.model";
import { Setor as SetorModel } from "@/models/setor.model";
import { Tecnico as TecnicoModel } from "@/models/tecnico.model";
import { buscarOrdensServicos, createOrdens } from "@/services/ordens.service";
import { buscarSetores } from "@/services/setores.service";
import { buscarTecnicos } from "@/services/tecnicos.service";
import { OrdemDeServicoTable } from "./_components/OrdemDeServicoTable";
import { Header } from "./_components/Header";
import { CadastroOSDialog } from "./_components/CadastroOSDialog";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [setores, setSetores] = useState<SetorModel[]>([]);
  const [tecnicos, setTecnicos] = useState<TecnicoModel[]>([]);

  const [form, setForm] = useState({
    numero_os: "",
    data_abertura: "",
    solicitante: "",
    setor: "",
    patrimonio: "",
    tipo_falha: "",
    solucao_tecnica: "",
    tecnico_responsavel: "",
    data_recolhimento: "",
    data_devolucao: "",
    data_fechamento: "",
    status: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const cleanedForm = {
        ...form,
        setor_id: Number(form.setor),
        tecnico_responsavel_id: Number(form.tecnico_responsavel),
        data_recolhimento: form.data_recolhimento || undefined,
        data_devolucao: form.data_devolucao || undefined,
        data_fechamento: form.data_fechamento || undefined,
      };

      await createOrdens(cleanedForm);
      
      const ordensData = await buscarOrdensServicos();
      setOrdens(ordensData);
      
      setIsDialogOpen(false);
      setForm({
        numero_os: "",
        data_abertura: "",
        solicitante: "",
        setor: "",
        patrimonio: "",
        tipo_falha: "",
        solucao_tecnica: "",
        tecnico_responsavel: "",
        data_recolhimento: "",
        data_devolucao: "",
        data_fechamento: "",
        status: "",
      });
      
      alert("Ordem de serviço cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao cadastrar ordem de serviço:", err);
      alert("Erro ao cadastrar ordem de serviço. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaTecnicos, listaSetores, ordensData] = await Promise.all([
          buscarTecnicos(),
          buscarSetores(),
          buscarOrdensServicos()
        ]);

        setTecnicos(listaTecnicos);
        setSetores(listaSetores);
        setOrdens(ordensData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ordensFiltradas = ordens.filter((ordem) => {
    const searchLower = search.toLowerCase();
    return (
      ordem.numero_os?.toLowerCase().includes(searchLower) ||
      ordem.solicitante?.toLowerCase().includes(searchLower) ||
      ordem.patrimonio?.toLowerCase().includes(searchLower) ||
      ordem.tipo_falha?.toLowerCase().includes(searchLower) ||
      ((setores.find((a) => a.id == ordem.setor_id)?.nome?.toLowerCase() ?? "").includes(searchLower)) ||
      (tecnicos.find((a) => a.id == ordem.tecnico_responsavel_id)?.nome?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-lg p-6">
        <Header 
          search={search} 
          setSearch={setSearch} 
          openDialog={() => setIsDialogOpen(true)} 
        />
        <CadastroOSDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <OrdemDeServicoTable
          loading={loading}
          ordens={ordensFiltradas}
          setores={setores}
          tecnicos={tecnicos}
        />
      </div>
    </DashboardLayout>
  );
}

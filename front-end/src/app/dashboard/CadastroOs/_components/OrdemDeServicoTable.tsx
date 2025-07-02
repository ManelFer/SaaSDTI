"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ordem } from "@/models/ordem.model";
import { Setor as SetorModel } from "@/models/setor.model";
import { Tecnico as TecnicoModel } from "@/models/tecnico.model";
import { formatDateTime } from "@/components/ui/DateTime";
import { Button } from "@/components/ui/button";

interface OrdemDeServicoTableProps {
  loading: boolean;
  ordens: Ordem[];
  setores: SetorModel[];
  tecnicos: TecnicoModel[];
}

export function OrdemDeServicoTable({
  loading,
  ordens,
  setores,
  tecnicos,
}: OrdemDeServicoTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableCaption>Lista de Ordens de Serviço</TableCaption>
        <TableHeader className="bg-green-100">
          <TableRow>
            <TableHead className="w-[100px]">Número OS</TableHead>
            <TableHead>Abertura</TableHead>
            <TableHead>Solicitante</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Patrimônio</TableHead>
            <TableHead>Tipo de Falha</TableHead>
            <TableHead>Solução</TableHead>
            <TableHead>Recolhimento</TableHead>
            <TableHead>Devolução</TableHead>
            <TableHead>Fechamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Técnico</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center py-4">
                Carregando...
              </TableCell>
            </TableRow>
          ) : ordens.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center py-4">
                Nenhuma ordem encontrada
              </TableCell>
            </TableRow>
          ) : (
            ordens.map((ordem) => (
              <TableRow key={ordem.id}>
                <TableCell className="font-medium">{ordem.numero_os}</TableCell>
                <TableCell>
                  {formatDateTime(ordem.data_abertura || "")}
                </TableCell>
                <TableCell>{ordem.solicitante}</TableCell>
                <TableCell>
                  {setores.find((a) => a.id == ordem.setor_id)?.nome}
                </TableCell>
                <TableCell>{ordem.patrimonio}</TableCell>
                <TableCell>{ordem.tipo_falha}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {ordem.solucao_tecnica}
                </TableCell>
                <TableCell>
                  {formatDateTime(ordem.data_recolhimento || "")}
                </TableCell>
                <TableCell>
                  {formatDateTime(ordem.data_devolucao || "")}
                </TableCell>
                <TableCell>
                  {formatDateTime(ordem.data_fechamento || "")}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      ordem.status === "Resolvido"
                        ? "bg-green-100 text-green-800"
                        : ordem.status === "Não resolvido"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ordem.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {
                    tecnicos.find((a) => a.id == ordem.tecnico_responsavel_id)
                      ?.nome
                  }
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

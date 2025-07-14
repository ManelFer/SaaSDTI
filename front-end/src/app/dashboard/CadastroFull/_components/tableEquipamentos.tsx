import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buscarItens, deleteItens } from "@/services/itens.service";
import { Itens } from "@/models/itens.model";
import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export function TableEquipamentos() {
  const [itens, setItens] = useState<Itens[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchItens = useCallback(async () => {
    setIsLoading(true);
    try {
      const itensData = await buscarItens();
      setItens(itensData);
    } catch (error) {
      toast.error("Falha ao buscar equipamentos.");
      console.error("Erro ao buscar itens:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItens();
  }, [fetchItens]);

  const handleDelete = async (itemId: number) => {
    try {
      await deleteItens(itemId);
      toast.success("Equipamento deletado com sucesso!");
      fetchItens();
    } catch (error) {
      toast.error("Erro ao deletar o item. Tente novamente.");
      console.error("Erro ao deletar item:", error);
    }
  };

  const itensFiltrados = itens.filter((item) =>
    item.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {isLoading ? (
        <p>Carregando...</p>
      ) : itens.length === 0 ? (
        <p>Nenhum equipamento encontrado.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipamentos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itensFiltrados.slice(0, 3).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nome}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => {
                      if (item.id !== undefined) {
                        handleDelete(item.id);
                      } else {
                        console.error("ID do item é indefinido.");
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

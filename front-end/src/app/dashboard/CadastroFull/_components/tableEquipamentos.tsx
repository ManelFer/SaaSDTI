import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buscarItens } from "@/services/itens.service";
import { Itens } from "@/models/itens.model";
import { useEffect, useState } from "react";

export function TableEquipamentos() {
  const [itens, setItens] = useState<Itens[]>([]);
  const [loading, ] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTableItens = async () => {
      // lista de equipamentos
      const itensData = await buscarItens();

      // setando itens data
      setItens(itensData);
    };
    fetchTableItens();
  }, []);

  useEffect(() => {
    if (loading) {
      const fetchItens = async () => {
        const itensData = await buscarItens();
        setItens(itensData);
        console.log("itens", itensData);
      };
      fetchItens();
    }
  }, [loading]);

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
      {itens.length === 0 && <p>Carregando...</p>}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

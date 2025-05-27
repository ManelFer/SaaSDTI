import {
  Table,
  TableBody,
  TableCaption,
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
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipamentos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {itens.slice(0, 3).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

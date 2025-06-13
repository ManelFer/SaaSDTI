import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buscarMarcas } from "@/services/marcas.service";
import { Marcas } from "@/models/marcas.model";
import { useEffect, useState } from "react";

export function TableMarcas() {
  const [marcas, setMarca] = useState<Marcas[]>([]);
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect (() => {
    const fetchMarcas = async () => {
      const marcasData = await buscarMarcas();

      setMarca(marcasData);
    };
    fetchMarcas();
  }, []);

  useEffect(() => {
    if (Loading){
      const fetchMarcas = async() => {
        const marcasData = await buscarMarcas();
        setMarca(marcasData);
        console.log("marcas", marcasData);
      };
      fetchMarcas();
    }
  }, [Loading]);

  const marcasFiltradas = marcas.filter((marca) => marca.nome?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="overflow-x-auto">
      <input 
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      {marcas.length === 0 && <p>Carregando...</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marcasFiltradas.slice(0, 3).map((marca) => (
            <TableRow key={marca.id}>
              <TableCell className="font-medium">{marca.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
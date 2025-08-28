
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buscarMarcas, deleteMarcas } from "@/services/marcas.service";
import { Marcas } from "@/models/marcas.model";
import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";


export function TableMarcas() {
  const [marcas, setMarca] = useState<Marcas[]>([]);
  const [Loading, ] = useState(false);
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
              <TableCell>
                <button
                  onClick={async () => {
                    try {
                      if (marca.id !== undefined) {
                        await deleteMarcas(marca.id);
                        setMarca(marcas.filter((m) => m.id !== marca.id));
                        toast.success("Marca deletada com sucesso!");
                      } else {
                        console.error("ID da marca é indefinido.");
                      }
                    } catch (error) {
                      console.error("Erro ao deletar marca", error);
                      toast.error("Erro ao deletar marca. Tente novamente.");
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
    </div>
  );
}

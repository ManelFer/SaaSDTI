import { Card } from "@/components/ui/card";
import { ClipboardList, Monitor, AlertTriangle } from "lucide-react";
export function AcoesRapidasCard() {
  return (
    <div >
      <Card className="p-4 mb-4 bg-blue-50 shadow-md rounded-lg">
        <div className="flex items-center space-x-4">
          <ClipboardList className="h-6 w-6 text-blue-500" />
          <button>
            <h4 className="text-sm font-bold text-blue-800">
              Nova Ordem de serviço
            </h4>
          </button>
        </div>
      </Card>

      <Card className="p-4 mb-4 bg-green-50 shadow-md rounded-lg">
        <div className="flex items-center space-x-4">
          <ClipboardList className="h-6 w-6 text-green-500" />
          <button>
            <h4 className="text-sm font-bold text-green-800">
              Cadastrar Equipamento
            </h4>
          </button>
        </div>
      </Card>

      <Card className="p-4 shadow-md rounded-lg bg-red-50 ">
        <div className="flex items-center space-x-4">
          <ClipboardList className="h-6 w-6 text-red-500" />
          <button>
            <h4 className="text-sm font-bold text-red-800">
              Relatório de Manutenção
            </h4>
          </button>
        </div>
      </Card>
    </div>
  );
}

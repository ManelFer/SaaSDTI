import { Card } from "@/components/ui/card";
import { File } from "lucide-react";

export function NovaOrdem() {
    return (
        <Card className="p-4 mb-4 bg-blue-50 shadow-md rounded-lg">
            <div className="flex items-center space-x-4">
                <File className="h-6 w-6 text-blue-500" />
                <button>
                    <h4 className="text-sm font-bold text-blue-800">
                        Cadastrar Nova ordem de serviço
                    </h4>
                </button>
            </div>
        </Card>
    );
}
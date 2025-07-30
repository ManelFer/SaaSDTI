
import { Monitor } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CardEstoque() {
  return (
    <Card className="flex items-center justify-between p-6 bg-green-50 border border-green-200">
      <div className="flex items-center space-x-4">
        <Monitor className="h-6 w-6 text-green-600" />
        <div>
          <h3 className="text-lg font-semibold text-green-800">Estoque</h3>
        </div>
      </div>
      <span className="text-xl font-bold text-green-800">150</span>
    </Card>
  );
}
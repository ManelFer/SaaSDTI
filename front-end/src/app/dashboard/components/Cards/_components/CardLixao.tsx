
import {Trash} from 'lucide-react';
import { Card } from '@/components/ui/card';

export function CardLixao() {
  return (
    <Card className="flex items-center justify-between p-6 bg-blue-50 border border-blue-200">
      <div className="flex items-center space-x-4">
        <Trash className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-blue-800">Lixão</h3>
        </div>
      </div>
      <span className="text-xl font-bold text-blue-800">12</span>
    </Card>
  );
}
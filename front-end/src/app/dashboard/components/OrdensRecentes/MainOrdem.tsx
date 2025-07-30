import { Clock } from 'lucide-react'
export function MainOrdem() {
    const recentOrders = [
        { id: 'ORD-001', solicitante: 'João Silva', setor: 'TI', tecnico: 'Carlos', status: 'pendente' },
        { id: 'ORD-002', solicitante: 'Maria Oliveira', setor: 'RH', tecnico: 'Ana', status: 'em andamento' },
        { id: 'ORD-003', solicitante: 'Pedro Santos', setor: 'Financeiro', tecnico: 'Luiz', status: 'concluída' },
    ];
    return (
        <div>
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ordens Recentes</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.solicitante} • {order.setor}</p>
                  <p className="text-xs text-gray-500">Técnico: {order.tecnico}</p>
                </div>
                {/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}
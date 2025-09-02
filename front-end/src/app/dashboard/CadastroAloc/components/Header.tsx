export default function Header() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Alocação</h2>
        <p className="text-sm text-gray-500">
          Controle de alocação dos equipamentos
        </p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
        + Nova Alocação
      </button>
    </div>
  );
}

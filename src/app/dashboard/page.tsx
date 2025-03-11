import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Menu Lateral */}
      <div className=" w-64 bg-white shadow-lg m-4 rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">Logo</h2>
        </div>
        <div className='border-t border-gray-200 w-full'>
          <nav className="mt-6 flex flex-col">
            <ul>
              <li className="px-6 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer border shadow-lg rounded-lg m-2">Os</li>
              <li className="px-6 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer border shadow-lg rounded-lg m-2">Estoque</li>
              <li className="px-6 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer border shadow-lg rounded-lg m-2">Lixão</li>
            </ul>
        </nav>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <LogoutButton />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Welcome to your dashboard!</p>
          </div>
        </div>

        {/* Div para reconhecer o usuário logado */}
        {/*<div className="mt-8 bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Usuário logado: {session.user?.email}</p>
        </div>*/}
      </div>
    </div>
  );
}
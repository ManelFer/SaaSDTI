
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">DTI-Controller</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sisema de controle de estoque e OS
          </p>
        </div>
        <LoginForm />
        <div className="text-center">
          <Link 
            href="/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </main>
  );
}

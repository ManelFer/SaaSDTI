'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Inicia o estado de carregamento

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirecionar após o login bem-sucedido
      router.push('/dashboard'); // Altere para a rota desejada
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div>
            <div className="flex justify-center mb-4">
              <Image
                src="/logodpe.png" // Substitua pelo caminho correto da sua imagem
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-[#066333]">Sistema de Gerenciamento</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#066333] focus:border-[#066333]"
              placeholder="seu@email.com"
              required // Adiciona a validação de campo obrigatório
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#066333] focus:border-[#066333]"
              placeholder="••••••••"
              required // Adiciona a validação de campo obrigatório
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-[#066333] hover:bg-[#257432]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#257432] hover:shadow-lg transition-colors hover:scale-105 duration-300`}
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
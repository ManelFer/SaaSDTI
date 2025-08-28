'use client';

import { useState } from 'react';
import ProfileMenu from '../ui/ProfileMenu';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/auth.context'; // ajuste o caminho conforme sua estrutura

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user } = useAuthContext(); // pegar o usuário logado do contexto

  return (
    <header className="sticky top-0 pb-3.5 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Título */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logodpe.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full mt-2"
            />
            <h1 className="text-2xl font-bold text-[#066333] mt-2">
              CoTI
            </h1>
          </div>
        </div>

        {/* Menu de Perfil */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {user?.nome }
          </span>

          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            userEmail={user?.email || 'Sem e-mail'}
          />
        </div>
      </div>
    </header>
  );
}
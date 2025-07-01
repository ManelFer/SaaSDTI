'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import ProfileMenu from '../ui/ProfileMenu';
import Image from 'next/image';



export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 pb-3.5 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Título + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logodpe.png" // Substitua pelo caminho correto da sua imagem
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full justify-center items-center mt-2"
            />
            {/* centralize */}
            <h1 className='text-2xl font-bold text-[#066333] mt-2'>
              (CoTI)
            </h1>
          </div>
        </div>

        {/* Menu de Perfil */}
        <div className="flex items-center gap-4">
          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            userEmail={userEmail}
          />
        </div>
      </div>
    </header>
  );
}
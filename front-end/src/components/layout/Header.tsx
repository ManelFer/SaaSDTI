'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import ProfileMenu from '../ui/ProfileMenu';
import { UserCircle } from 'lucide-react'; // ícone opcional

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
    <header className="bg-white shadow-md border-b border-gray-200 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Título */}
        <div className="flex items-center gap-3">
          <UserCircle className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Sistema do Setor
          </h1>
        </div>

        {/* Menu de Perfil */}
        <div className="flex items-center">
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

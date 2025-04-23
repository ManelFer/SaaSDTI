'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import ProfileMenu from '../ui/ProfileMenu';

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Monitora o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado
        setUserEmail(user.email);
      } else {
        // Usuário não está logado
        setUserEmail(null);
      }
    });

    // Limpa o subscription quando o componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-gray-800">Sistema do setor</h2>
        </div>
        <div className="flex items-center">
          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            userEmail={userEmail} // Passa o email para o ProfileMenu
          />
        </div>
      </div>
    </header>
  );
}
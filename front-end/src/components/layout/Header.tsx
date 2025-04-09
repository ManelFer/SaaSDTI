'use client';

import { useState } from 'react';
import ProfileMenu from '../ui/ProfileMenu';

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">Sistema do setor</h2>
        </div>
        <div className="flex items-center">
          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          />
        </div>
      </div>
    </header>
  );
} 
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../../public/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Ordens de Serviço', href: '/dashboard/CadastroOs' },
  { name: 'Estoque', href: '/dashboard/CadastroEst' },
  { name: 'Lixão', href: '/dashboard/CadastroLix' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b px-4">
        <Image src={Logo} alt="Logo" className="w-36 object-contain" priority />
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-700 font-semibold shadow-inner'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-green-700'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

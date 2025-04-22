'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../../public/logo.png'


const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Ordens de Serviço', href: '/dashboard/CadastroOs' },
  { name: 'Estoque', href: '/dashboard/CadastroEst' },
  { name: 'Lixão', href: '/dashboard/CadastroLix' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <img src={Logo.src} alt="logo" className='w-30'/>
          
        </div>
        <nav className="flex-1 px-4 py-4 mt-7 overflow-y-auto">
          <ul className="space-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
} 
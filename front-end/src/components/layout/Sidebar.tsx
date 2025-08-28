"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Box, Trash2, ChevronRight, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Ordens de Serviço", href: "/dashboard/CadastroOs", icon: FileText },
  { name: "Estoque", href: "/dashboard/CadastroEst", icon: Box },
  { name: "Leilão", href: "/dashboard/CadastroLix", icon: Trash2 },
  { name: "cadastros", href: "/dashboard/CadastroFull", icon: FileText },
  { name: "Alocação", href: "/dashboard/CadastroAloc", icon: FileText }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col fixed">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#257432] rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white " />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Sistema TI</h2>
            <p className="text-xs text-gray-500">Defensoria Pública</p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-[#257432] font-medium"
                      : "text-gray-800 hover:bg-gray-50 hover:text-[#257432]"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-[#257432]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer da Sidebar */}
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
        <p>Versão 1.0.0</p>
        <p className="mt-1">
          © {new Date().getFullYear()} Sistema Cronos | DTI Coordenação
        </p>
      </div>
    </aside>
  );
}

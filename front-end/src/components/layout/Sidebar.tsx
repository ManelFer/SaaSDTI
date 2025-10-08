"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Box,
  Trash2,
  ChevronRight,
  Settings,
  ArrowLeftRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import ProfileMenu from "../ui/ProfileMenu";
import { useAuthContext } from "@/contexts/auth.context";
import { buscarTecnicoPorId } from "@/services/tecnicos.service";
import { Tecnico } from "@/models/tecnico.model";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Ordens de Serviço", href: "/dashboard/CadastroOs", icon: FileText },
  { name: "Estoque", href: "/dashboard/CadastroEst", icon: Box },
  { name: "Descarte", href: "/dashboard/CadastroLix", icon: Trash2 },
  { name: "Cadastros", href: "/dashboard/CadastroFull", icon: FileText },
  { name: "Alocação", href: "/dashboard/CadastroAloc", icon: ArrowLeftRight },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tecnico, setTecnico] = useState<Tecnico | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?.id) return;

    const carregarTecnico = async () => {
      try {
        const tecnicoEncontrado = await buscarTecnicoPorId(user.id);
        setTecnico(tecnicoEncontrado);
      } catch (err) {
        console.error("Erro ao buscar técnico:", err);
      }
    };

    carregarTecnico();
  }, [user?.id]);

  return (
    <>
      {/* Botão móvel (hambúrguer) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-[#257432] text-white hover:bg-[#1d5f28] transition"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar responsiva */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              {/* <Settings className="w-6 h-6 text-white" /> */}
              <Image
                src="/logoDpe.ico"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Sistema TI</h2>
              <p className="text-xs text-gray-500">Defensoria Pública</p>
              <p className="text-xs text-gray-500 opacity-30">Versão 1.0.0-08/10/2025</p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          ></button>
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
                    onClick={() => setIsOpen(false)}
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

        {/* Rodapé */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 truncate">
              {user?.nome}
            </span>

            <ProfileMenu
              isOpen={isProfileMenuOpen}
              onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              userEmail={tecnico?.nome ?? user?.nome ?? ""}
            />
          </div>
        </div>
      </aside>

      {/* Overlay escuro quando o menu está aberto (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 text-2xl bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

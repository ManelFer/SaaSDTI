"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";

interface ProfileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  userEmail?: string | null;
}

export default function ProfileMenu({
  isOpen,
  onToggle,
  userEmail,
}: ProfileMenuProps) {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.replace("/login");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Botão do menu */}
      <Menu.Button
        onClick={onToggle}
        className="flex items-center gap-2 focus:outline-none group"
      >
        <UserCircleIcon className="h-8 w-8 text-gray-500 group-hover:text-[#257432] transition-colors" />
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700 truncate max-w-[140px]">
            {userEmail || "Usuário"}
          </span>
        </div>
        <ChevronUpIcon className="w-4 h-4 text-gray-400 group-hover:text-[#257432] transition" />
      </Menu.Button>

      {/* Menu suspenso (agora abre para cima e mais à esquerda) */}
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95 -translate-y-2"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 -translate-y-2"
      >
        <Menu.Items
          className="absolute left-0 bottom-full mb-2 w-48 origin-bottom-left rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <Menu.Item>
            {({ active }) => (
              <a
                href="/dashboard/MeuPerfil"
                className={`${
                  active ? "bg-gray-50 text-[#257432] rounded-md" : "text-gray-700"
                } block px-4 py-2 text-sm transition-colors`}
              >
                Meu Perfil
              </a>
            )}
          </Menu.Item>

          <div className="border-t border-gray-100 my-1" />

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? "bg-red-50 text-red-600 rounded-md" : "text-red-500"
                } block w-full text-left px-4 py-2 text-sm font-medium transition-colors`}
              >
                Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

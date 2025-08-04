"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
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
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={onToggle}
      >
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">
          {userEmail || "Usuário"}{" "}
          {/* Mostra o email ou 'Usuário' se não houver email */}
        </span>
      </Menu.Button>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100" : ""
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Meu Perfil
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              //Route protection
              <button
                onClick={async () => {
                  await signOut(auth);
                  window.location.replace("/login");
                }}
                className={`${
                  active ? "bg-gray-100" : ""
                } block w-full text-left px-4 py-2 text-sm text-red-600`}
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

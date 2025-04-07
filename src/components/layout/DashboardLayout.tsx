'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Service Orders', href: '/os', icon: ClipboardDocumentListIcon },
  { name: 'Inventory', href: '/inventory', icon: CubeIcon },
  { name: 'Dump Items', href: '/dump', icon: TrashIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-blue-600">
            <h1 className="text-white text-xl font-bold">SaaSDTI</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}

            {authState.user?.role === 'admin' && (
              <Link
                href="/register"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === '/register'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserPlusIcon
                  className={`mr-3 h-5 w-5 ${
                    pathname === '/register' ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                Register User
              </Link>
            )}
          </nav>

          {/* User Info and Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {authState.user?.username}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {authState.user?.role}
                </p>
              </div>
              <button
                onClick={() => logout()}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {navigation.find((item) => item.href === pathname)?.name ||
                'Dashboard'}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
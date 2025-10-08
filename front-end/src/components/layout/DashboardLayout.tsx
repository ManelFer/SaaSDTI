"use client";

import { ReactNode } from "react";
import Sidebar from "../layout/Sidebar";
// import Header from "../layout/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar fixa ou móvel */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64">
        {/* Header opcional */}
        {/* <Header /> */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

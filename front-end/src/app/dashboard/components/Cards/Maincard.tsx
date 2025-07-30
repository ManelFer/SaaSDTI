"use client";


import { CardLixao } from "./_components/CardLixao";
import { CardEstoque } from "./_components/Estoque";
import { CardOsResolvido } from "./_components/OsResolvido";

export function MainCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardLixao />
      <CardOsResolvido />
      <CardEstoque />
    </div>
  );
}
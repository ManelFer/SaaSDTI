"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export function PerfilAvatar() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#257432]">
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">Manoel Ferreira Matos</h2>
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, User2 } from "lucide-react";

export function MeuPerfilForm() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="mb-2">Nome Completo</Label>
        <div className="relative">
          <User2 className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input className="pl-9" defaultValue="Maria Santos" />
        </div>
      </div>

      <div>
        <Label className="mb-2">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
          <Input className="pl-9" type="email" defaultValue="tecnico@tribunal.gov.br" />
        </div>
      </div>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro de Ordem de Serviço</h1>
          <div className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'>
            <Dialog>
              <DialogTrigger asChild>
                <Button >
                  Cadastrar Ordem de Serviço
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastro de Ordem de Serviço</DialogTitle>
                  <DialogDescription> Cadastre uma nova ordem de serviço </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  {/* Número da OS */}
                  <div className='grid grid-cols-2 gap-4 items-center'>
                    <Label htmlFor='os-number' className='text-right'>
                      Número da OS:
                    </Label>
                    <Input id='os-number' placeholder='Número da OS' className='col-span-3' />
                  </div>
                  {/* Data e hora de abertura */}
                  <div className='grid grid-cols-2 gap-4 items-center'>
                    <Label htmlFor='os-date' className='text-right'>
                      Data e hora de abertura:
                    </Label>
                    <Input id='os-date' type='datetime-local' className='col-span-3' />
                  </div>

                  {/* Solicitante */}
                  <div className='grid grid-cols-2 gap-4 items-center'>
                    <Label htmlFor='solicitante' className='text-right'>
                      Solicitante:
                    </Label>
                    <Input id='solicitante' placeholder='Nome do solicitante' className='col-span-3' />
                  </div>

                  {/* Setor / Fórum */}
                  <div>
                    <Label htmlFor='setor' className='text-right mb-4'>
                      Setor / Fórum:
                    </Label>
                    <Select>
                      <SelectTrigger className='w-[300px]'>
                        <SelectValue placeholder='Selecione o setor / fórum' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Setor / Fórum</SelectLabel>
                          <SelectItem value='setor-forum-1'>Setor 1</SelectItem>
                          <SelectItem value='setor-forum-2'>Setor 2</SelectItem>
                          <SelectItem value='setor-forum-3'>Setor 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit' className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 hover:scale-105 duration-300'>
                    Salvar OS
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
        </div>
        
        <Table>
          <TableCaption>Lista de Ordens de Serviço</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Número da OS</TableHead>
              <TableHead>Data / Hora Abertura</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Setor / Fórum </TableHead>
              <TableHead>Pat. Equipamento</TableHead>
              <TableHead>Tipo de Falha</TableHead>
              <TableHead>Solução técnica</TableHead>
              <TableHead>Data / Hora Recolhido</TableHead>
              <TableHead>Data / Hora Devolvido</TableHead>
              <TableHead>Data / Hora do Fechamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Técnico Responsável</TableHead>
            </TableRow>
          </TableHeader>

          
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>0001/2002</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>João da Silva</TableCell>
              <TableCell>Setor de Controle</TableCell>
              <TableCell>ABC1234567890</TableCell>
              <TableCell>Falha no sistema</TableCell>
              <TableCell>Reinício do sistema</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>2025-01-01 10:00:00</TableCell>
              <TableCell>Resolvido</TableCell>
              <TableCell className='text-right'>José da Silva</TableCell>
            </TableRow>

          </TableBody>
        </Table>
        
      </div>
    </DashboardLayout>
  );
} 
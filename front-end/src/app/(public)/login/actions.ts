'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validação no servidor
  if (!email || !password) {
    return { error: 'Preencha todos os campos!' };
  }

  // Simulação: substitua por sua lógica real (ex.: Prisma, NextAuth.js)
  if (email == 'admin@exemplo.com' && password == '123456') {
    (await cookies()).set('auth_token', 'fake-token'); // Exemplo de cookie
    redirect('/app');
  } else {
    return { error: 'Credenciais inválidas!' };
  }
}
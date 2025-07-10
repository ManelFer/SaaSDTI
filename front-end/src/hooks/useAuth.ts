

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../contexts/auth.context';

export default function useAuth(protectedRouter = false) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (protectedRouter && !user) {
        router.push('/login');
      } else if (!protectedRouter && user) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, protectedRouter, router]);

  return { user, loading };
}


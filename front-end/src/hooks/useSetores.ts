import { useState, useEffect } from 'react';
import { fetchSetores } from '@/services/setores.service';

interface Setor {
  id: number;
  name: string;
}

export function useSetores() {
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSetores = async () => {
            try {
                const data = await fetchSetores() as Setor[];
                setSetores(data);
            } catch (err: any) {
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadSetores();
    }, []);

    return { setores, loading, error };
}

function setError(message: any) {
    throw new Error('Function not implemented.');
}

import { useState, useEffect } from 'react';
import { buscarSetores } from '@/services/setores.service';
import { Setor } from '@/models/setor.model'; // Ensures the correct model is used

export function useSetores() {
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSetores = async () => {
            try {
                // The service now returns the correctly typed data
                const data = await buscarSetores();
                setSetores(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        loadSetores();
    }, []);

    return { setores, loading, error };
}

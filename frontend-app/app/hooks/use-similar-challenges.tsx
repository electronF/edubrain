import { useState } from 'react';
import HookReturn from '../types/hook-return';


export default function useSimilarSChallenges():HookReturn {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|string>(null);

  const url = "https://4224-132-207-28-75.ngrok-free.app/similar_challenges"; 

  // Fonction pour récupérer les données, déclenchée à la demande
  const fetchSimilarData = async (challenge:string) => {
    if (!challenge) {
      setError("Le paramètre 'challenge' est requis.");
      return;
    }

    setLoading(true);
    setError(null); // Réinitialiser l'erreur avant l'appel

        try {
        const response = await fetch(`${url}?challenge=${challenge}`);
        if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const result = await response.json();
        setData(result.challenges);
        return result.challenges;
    } catch (err:any) {
        if (err.response) {
            setError(`Erreur API : ${err.response.data.message}`);
        } else {
        setError(`Erreur : ${err.message}`);
        }
    } finally {
      setLoading(false); // Arrêter le loader
    }
  };

  // Retourner les états et la fonction d'appel manuelle
  return [ data, loading, error, fetchSimilarData ];
}

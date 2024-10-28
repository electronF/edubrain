type HookReturn = [
    string[], // Liste des chaînes de caractères
    boolean,  // État de chargement
    string | null,  // Erreur ou null
    (strength: string) => Promise<string[]> // Fonction de fetch
  ];

export default HookReturn
import { useState } from "react";
import axios from "axios";
import RecommandedGoal from "../types/recommanded-goals";
import RecommandationStepItem from "../types/recommandation-step-item";

export function useFetchRecommendations() {
  const [loading, setLoading] = useState<boolean>(false);
  // const [goals, setGoals] = useState<RecommandedGoal[]>([]);
  const [recommandedGoals, setRecommendedGoals] = useState<RecommandedGoal[]>([]);
  const [recommandationGoalsSteps, setRecommandationGoalsSteps] = useState<RecommandationStepItem[]>([]);
  const [error, setError] = useState<string | null>(null);
 

  const url = "https://4224-132-207-28-75.ngrok-free.app/receive_data"; // URL de l'API

  const fetchRecommendations = async (
    strengths: string[],
    challenges: string[],
    needs: string[],
    method: string
  ) => {
    setLoading(true);
    setError(null); // Réinitialise l'erreur avant l'appel
    console.log({
      strengths,
      challenges,
      needs,
    })
    try {
      const response = await axios.post(`${url}?method=${method}`, {
        strengths,
        challenges,
        needs,
      });

      // Stocke les objectifs retournés
      const responseGoals = [...response.data.goals]
      responseGoals.sort((a, b)=> a.priority - b.priority)

      const newRecommandedGoals:RecommandedGoal[] = [];
      for(const recommandedGoald of responseGoals)
      {
        newRecommandedGoals.push(
          {
            id: recommandedGoald['id'],
            description: recommandedGoald['description'],
            status: "neutral",
            category: recommandedGoald['category'],
            subCategory: recommandedGoald['sub_category'],
            subSubCategory: recommandedGoald['sub_sub_category'],
            age: recommandedGoald['age']??0 
          }
        )
      }
      setRecommendedGoals(newRecommandedGoals || []);
      setRecommandationGoalsSteps(response.data.steps)

    } catch (err: any) {
      if (err.response) {
        setError(`Erreur API : ${err.response.data.message}`);
      } else {
        setError(`Erreur : ${err.message}`);
      }
    } finally {
      setLoading(false); // Stop le loader
    }
  };

  // Retourne les états et la fonction pour effectuer l'appel
  return { loading, recommandedGoals, recommandationGoalsSteps, error, setRecommendedGoals, fetchRecommendations };
}

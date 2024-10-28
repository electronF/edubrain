"use client"
// import Image from "next/image";

// import { useEffect } from 'react';
// import {  redirect } from 'next/navigation';

// export default function HomePage() {
//   // const router = useRouter();

//   // useEffect(() => {
//   //   router.push('/goals');
//   // }, [router]);
//   redirect(`/goals`)

//   return <p>Redirection en cours...</p>;
// }
// 0

import { useState } from "react";

import RecommandationsSide from "./components/sections/recommandations-side"
import ProfilSide from "./components/sections/profil-side"
import Header from "./components/layout/page-menu"
import ProfilContainer from "./components/containers/profil-container"
import RecommandationMenu from "./components/layout/recommandation-menu";
import CategoriesMenu from "./components/layout/categories-menu";
import RecommendedItem from "./components/elements/recommanded-item";
import RecommandationStepMenu from "./components/layout/recommandation-step-menu";

import { useFetchRecommendations } from "./hooks/fetch-recommandation";

import RecommandedGoal from "./types/recommanded-goals";
import Category from "./types/category";
import TabItem from "./types/tab-item";

import CategoriesItemsList from "@/public/formated_categories.json"
import RecommandationSteps from "./components/containers/recommandation-steps";
import useSimilarSChallenges from "./hooks/use-similar-challenges";
import useSimilarStrengths from "./hooks/use-similar-strenghts";



export default function GoalsHome() {
  const [selectedStrengthsItems, setSelectedStrengthsItems] = useState<string[]>([]);
  // ["Tag 1", "Tag 2", "Tag 3"]
  // Liste par défaut de suggestions de items
  const defaultSuggestions:string[] = [] //["Lit et écrit couramment", "Organisé", "Créatif"];
  const [suggestionsStrengthsItems, setSuggestionsStrengthsItems] = useState<string[]>(defaultSuggestions);

  const [selectedChallengesItems, setSelectedChallengesItems] = useState<string[]>([]);
  // ["Tag 1", "Tag 2", "Tag 3"]
  // Liste par défaut de suggestions de items
  const [suggestionsChallengesItems, setSuggestionsChallengesItems] = useState<string[]>(defaultSuggestions);

  const [selectedNeedsItems, setSelectedNeedsItems] = useState<string[]>([]);
  // ["Tag 1", "Tag 2", "Tag 3"]
  // Liste par défaut de suggestions de items
  const [suggestionsNeedsItems, setSuggestionsNeedsItems] = useState<string[]>(defaultSuggestions);

  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

  const recommandationsTabs:TabItem[] = [
    {
      id: "1",
      name: "Hybride"
    },
    {
      id: "2",
      name: "Similarité de profils"
    },
    {
      id: "3",
      name: "Alignement d'items"
    },
  ]

  const { loading, recommandedGoals, recommandationGoalsSteps, error, setRecommendedGoals, fetchRecommendations } = useFetchRecommendations();
    
  const handleFetch = () => {
    setFormErrorMessage("")
    if(selectedChallengesItems.length > 0 || selectedNeedsItems.length > 0){
      let recommandationMethod = "hybrid"
      if (recommandationType === "2")
      {  recommandationMethod = "profil_similarity"}
      else if (recommandationType === "3")
      {  recommandationMethod = "profil_alignement"}

      fetchRecommendations(
        [...selectedStrengthsItems], //Forces
        [...selectedChallengesItems], //Défis
        [...selectedNeedsItems], // Besoins
        recommandationMethod // Méthode choisie
      );
      setValidRecommendations([]);
      setInvalidRecommendations([]);
    }
    else
    {
      setFormErrorMessage("Vous devez definir aumoins un défis ou un besoin")
    }
  };

  const [recommandationType, setRecommandationType] = useState<string>(recommandationsTabs[0].id);

  const handleRecommandationTypeSelected = (id:string) => {
    if(id != recommandationType){
      setRecommandationType(id)
      setCategories([]);
      handleFetch()
    }
  }

  const recommandationsStepTabs:TabItem[] = [
    {
      id: "1",
      name: "Objectifs"
    },
    {
      id: "2",
      name: "Moyens"
    },
  ]

  const [recommadationStepTab, setRecommandationStepTab] = useState<string>(recommandationsStepTabs[0].name);
  // fetch()
  recommadationStepTab

  const handleRecommandationStepTab = (value:string) => {
    setRecommandationStepTab(value)
  }


  const [categories, setCategories] = useState<Category[]>([...CategoriesItemsList]);

  const [categoriesThatMustNotBeDisplayed, setCategoriesThatMustNotBeDisplayed] = useState<Array<Category>>([]);

  const handleMenuItemChange = (item:Category)=>{
    const newCategoriesThatMustNotBeDisplayed = categoriesThatMustNotBeDisplayed.filter((category)=>category != item)
    let mustBeAdd = false
    for(const subCategory of item.children){
      if(subCategory.isChecked == false)
      {
        mustBeAdd = true;
        break
      }
    }
    if(mustBeAdd){
      setCategoriesThatMustNotBeDisplayed([...newCategoriesThatMustNotBeDisplayed, item])
    }
    else{
      setCategoriesThatMustNotBeDisplayed(newCategoriesThatMustNotBeDisplayed)
    }
  } 


  const recommandationsListTabs:TabItem[] = [
    {
      id: "1",
      name: "Tout"
    },
    {
      id: "2",
      name: "Valides"
    },
    {
      id: "3",
      name: "Non valides"
    },
  ]

  const [selectedRecommadationsListTab, setSelectedRecommandationsListTab] = useState<string>(recommandationsListTabs[0].id);

  const onRecommandationsListTabSelected = (id:string) => {
    setSelectedRecommandationsListTab(id)
  }

  const [validRecommendations, setValidRecommendations] = useState<RecommandedGoal[]>([]);
  const [invalidRecommendations, setInvalidRecommendations] = useState<RecommandedGoal[]>([]);

  const recommandationStatusChange = (id:number, status:"neutral" | "valid" | "invalid") =>{
      const newRecommandedGoals = [...recommandedGoals]
      for(const recommandedGoal of newRecommandedGoals){
        if(recommandedGoal.id == id){
          recommandedGoal.status = status
        }
      }
      setRecommendedGoals(newRecommandedGoals)
      if(status === "valid"){ handleValid(id)}
      else if(status === "invalid") { handleInvalid(id)}
      else {handleNeutral(id)}
  }


  const handleValid = (id: number) => {
    setInvalidRecommendations((prev) => prev.filter((item) => item.id !== id));
    setValidRecommendations(recommandedGoals.filter((item) => item.status === "valid"));
  };

  const handleInvalid = (id: number) => {
    setValidRecommendations((prev) => prev.filter((item) => item.id !== id));
    setInvalidRecommendations(recommandedGoals.filter((item) => item.status === "invalid"));
  };

  const handleNeutral = (id: number) => {
    setValidRecommendations((prev) => prev.filter((item) => item.id !== id));
    setInvalidRecommendations((prev) => prev.filter((item) => item.id !== id));
  };

  const mustRecommandedGoalBeDisplayed = (item:RecommandedGoal):boolean => {
      for(const category of categoriesThatMustNotBeDisplayed){
         if(item.category?.toLowerCase().trim() == category.name.toLowerCase().trim()){
           for(const subCategory of category.children){
              const subCategoryName = subCategory.name.toLowerCase().trim()
              // || subCategoryName === item.subSubCategory?.toLowerCase()
             if((subCategoryName === item.subCategory?.trim().toLowerCase()) && (subCategory.isChecked == false)){
              return false;
             }
           }
         }
      }
      return true;
  }

  const handleSubmitValidation = () =>
  {
     const dataToSend = { 
        profil: {
          strengths: [...selectedStrengthsItems],
          challenges: [...selectedChallengesItems],
          needs: [...selectedNeedsItems]
        },
        validRecommendations,
        invalidRecommendations,
        recommandedGoals
      }

  }

  const [displayRecommandationSteps, setDisplayRecommandationSteps] = useState<boolean>(false);

  return (
    <main className="flex flex-col h-screen bg-white">
        <div className="flex flex-col border-b">
          <Header activeTab="" />
        </div>
        <div className="flex flex-row flex-1">
          <ProfilSide>
          <div className="flex flex-row py-2 px-4 border-b mb-1">
            <div className="flex-1" />
            <RecommandationStepMenu tabs={recommandationsStepTabs} handleTabChange={handleRecommandationStepTab} />
        </div>
            <ProfilContainer 
              title={"Forces (Strenghts)"} 
              placeHolder={"Entrez les forces"} 
              selectedItems={selectedStrengthsItems} 
              setSelectedItems={setSelectedStrengthsItems} 
              suggestionsItems={suggestionsStrengthsItems} 
              setSuggestionsItems={setSuggestionsStrengthsItems}
              hookFunction={useSimilarStrengths}
            />
            <ProfilContainer 
              title={"Défis (Challenges)"} 
              placeHolder={"Entrez les défis"} 
              selectedItems={selectedChallengesItems} 
              setSelectedItems={setSelectedChallengesItems} 
              suggestionsItems={suggestionsChallengesItems} 
              setSuggestionsItems={setSuggestionsChallengesItems}
              hookFunction={useSimilarSChallenges}
              // contentBgColor={'bg-gray-100'}
            />
            <ProfilContainer 
              title={"Besoins (Needs)"} 
              placeHolder={"Entrez les besoins"} 
              selectedItems={selectedNeedsItems} 
              setSelectedItems={setSelectedNeedsItems} 
              suggestionsItems={suggestionsNeedsItems} 
              setSuggestionsItems={setSuggestionsNeedsItems}
              hookFunction={useSimilarStrengths}
              addToSelectedDirectly={true}
            />
            <div className="flex justify-center">
              {(formErrorMessage.trim().length > 0) && (<span className="px-4 text-red-500 text-md py-1">{formErrorMessage}</span>)}
            </div>
            <div className="flex flex-row gap-4 px-2 py-4 justify-center">
              <button className="px-8 py-3 text-black text-sm bg-[#C7D8FF]  hover:text-white hover:bg-[#0A2870] rounded-md" onClick={handleFetch}>RECOMMANDER</button>
              {loading && <span className="py-3 text-black">Chargement...</span>}
              {error && <span className="py-3 text-red-500">{error}</span>}
            </div>
          </ProfilSide>
          <RecommandationsSide>
            <div className="p-4 rounded-md">
              <div className="flex flex-row">
                {/* Label */}
                <label className="block text-[18px] font-semibold text-gray-600 mb-2 flex-1">
                  Type de recommandations
                </label>
                <button className="px-4 py-1 text-black text-sm bg-[#C7D8FF]  hover:text-white hover:bg-[#0A2870] rounded-md " onClick={handleSubmitValidation}>Envoyer vos validations</button>
              </div>
              {/* Menu de choix */}
              <RecommandationMenu tabs={recommandationsTabs} handleTabChange={handleRecommandationTypeSelected} />
            </div>
            {/* Etape de recommandations */}
            <div className="flex flex-col px-4">
            {(loading && <div className="flex flex-row justify-start py-3">
                <div className="spinner-container mr-4">
                  <div className="spinner"></div>
                </div>
                <div className=" text-black font-semibold blink pt-1">Chargement...</div>
              </div>)}
              {error && <span className="py-3 text-red-500">{error}</span>}
            </div>
            <div className="flex flex-col my-3 px-4"> 
              <div className="flex flex-row  py-1">
                <label className="block text-[14px] font-semibold text-gray-600 mb-2 flex-1">
                  Etapes de la recommandation à dérouler
                </label>
                <button className="text-sm bg-gray-300  py-1 px-2 ml-auto text-[#0A2870] hover:text-[#5b70a3] rounded-md" onClick={()=>setDisplayRecommandationSteps(!displayRecommandationSteps)}>{(displayRecommandationSteps)?"Masquer":"Affichier"}</button>
              </div>
              {(displayRecommandationSteps)?<div className="text-black text-sm"><RecommandationSteps data={recommandationGoalsSteps} /></div>:null}
            </div>
            <div className="flex flex-row">
              <div className="flex-shrink px-4">
                <CategoriesMenu categories={[...categories]} handleMenuItemChange={handleMenuItemChange}/>
              </div>
              <div className="flex flex-col flex-grow p-4 bg-white ml-2">
                <RecommandationMenu tabs={recommandationsListTabs} handleTabChange={onRecommandationsListTabSelected}/>
                <div className="space-y-4 py-2">
                  {((selectedRecommadationsListTab.toLocaleLowerCase() === "2")?validRecommendations: (selectedRecommadationsListTab.toLocaleLowerCase() === "3")?invalidRecommendations: recommandedGoals).map((rec) => (mustRecommandedGoalBeDisplayed(rec)?
                    (<RecommendedItem
                      key={rec.id}
                      recommendation={rec}
                      handleStatusChange={(status)=> recommandationStatusChange(rec.id, status)}
                      status={rec.status}
                    />):(null)
                  ))}
                </div>
              </div>
            </div>
          </RecommandationsSide>
        </div>
    </main>
  );
}

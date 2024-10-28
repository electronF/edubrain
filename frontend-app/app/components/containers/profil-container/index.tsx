import { Dispatch, SetStateAction, useState } from "react";

import ProfilItem from "../../elements/profil-item"
import ProfilInputField from "../../elements/profil-input-field";

interface ProfilContainerProps {
    title: string
    placeHolder ?: string
    selectedItems : Array<string>
    setSelectedItems : Dispatch<SetStateAction<string[]>> 
    suggestionsItems : Array<string>
    setSuggestionsItems : Dispatch<SetStateAction<string[]>>
    hookFunction: ()=> [string[], boolean, (string | null), (strength: string) => Promise<string[]>]
    contentBgColor?: string
    addToSelectedDirectly?: boolean
}

export default function ProfilContainer({title, placeHolder, selectedItems, setSelectedItems, suggestionsItems, setSuggestionsItems, hookFunction, contentBgColor, addToSelectedDirectly}:ProfilContainerProps){

    const [data, loading, error, fetchSimilarData] = hookFunction();

    const removeTag = (index: number) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
    };
    const removeTagFromSuggestions = (index: number) => {
        setSuggestionsItems(suggestionsItems.filter((_, i) => i !== index));
    };

    // Fonction : Ajouter un tag à la liste de sélection
    const handleTagClick = (tag: string) => {
        if (!selectedItems.includes(tag)) {
        setSelectedItems([...selectedItems, tag]); // Ajout du tag
        setSuggestionsItems(suggestionsItems.filter((value, _) => value !== tag));
        }
    };

    const addToSuggestion = async (tag: string) => {
        if(addToSelectedDirectly == true){handleTagClick(tag)}
        else if (!suggestionsItems.includes(tag)) {
                const data1 = await fetchSimilarData(tag);
                setSuggestionsItems([ tag, ...data1])
        }


        // Mise à jour des suggestions pour inclure le tag entré
        // const updatedSuggestions = suggestions.filter(
        //     (suggestion) =>
        //       suggestion.toLowerCase().includes(tag.toLowerCase()) &&
        //       !selectedItems.includes(suggestion)
        // );
      
        // setSuggestionsItems(updatedSuggestions.length > 0 ? updatedSuggestions : suggestions);
    }

    const [displaySection, setDisplaySection] = useState<boolean>(true);

    return (
        <div className="px-4 py-1 profil-container">
            {/* Titre avec une ligne horizontale */}
            <div className="flex flex-col title bg-[#0A2870]/10">
                <div className="flex flex-row">
                    <span className="px-1 py-1  text-black font-semibold flex-1">{title}</span>
                    <button className="text-sm bg-gray-300  py-1 px-2 ml-auto text-[#0A2870] hover:text-[#5b70a3] rounded-md" onClick={()=>setDisplaySection(!displaySection)}>{(displaySection)?"Masquer":"Affichier"}</button>
                </div>
                <div className="border-b border-gray-300" />
            </div>
            {(displaySection)?<div className={`flex flex-col mb-4 py-2 ${contentBgColor}`}>    
                    {/* Liste des items choisis */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedItems.map((tag, index) => (
                            <ProfilItem
                            key={index + Math.random()}
                            name={tag}
                            index={index}
                            handleTagClick={()=>{}}
                            handleTagRemove={removeTag}
                        />
                        ))}
                    </div>

                    <ProfilInputField error={error} loading={loading} placeHolder={placeHolder ? placeHolder:"Entrer quelque chose"} handleSubmit={(value) => addToSuggestion(value)} />

                    {/* Liste des suggestions de items */}
                    <div className="flex flex-wrap gap-2">
                        {suggestionsItems.map((tag, index) => (
                        // <button
                        //     key={index}
                        //     onClick={() => handleTagClick(tag)}
                        //     className=" bg-gray-100 text-sm text-[#0a2870] px-2 py-1 rounded-md hover:bg-blue-300"
                        // >
                        //     {tag}
                        // </button>
                        <ProfilItem
                            key={index + Math.random()}
                            name={tag}
                            index={index}
                            handleTagClick={()=> handleTagClick(tag)}
                            handleTagRemove={removeTagFromSuggestions}
                        />
                        ))}
                    </div>
                </div>:null
            }
        </div>
    );
}
import { useState } from "react";

interface ProfilInputFieldProps 
{
    placeHolder? : string
    loading: boolean
    error: string | null
    handleSubmit: (value:string) => void
}



export default function ProfilInputField({loading, error, placeHolder, handleSubmit}: ProfilInputFieldProps){
    const [viewMode, setViewMode] = useState<"single" | "multiple">("single");


    const handleModeChange = (mode: "single" | "multiple") => {
        setViewMode(mode);
    };

    // Gestion des événements (fonctions à implémenter plus tard)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };


    const handleValidation = () => {
        if (inputValue.trim()) {
            handleSubmit(inputValue); // Envoie du tag saisi pour rechercher les suggestions
            // Vide le champ de saisie après validation
            setInputValue("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(inputValue); // Appelle la fonction onEnter avec la valeur du champ
            setInputValue(''); // Réinitialise le champ après l'appui sur Entrée
        }
      };

    const [inputValue, setInputValue] = useState("");

    return (
        <>
            {/* Boutons pour basculer entre les modes */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-4 py-1 text-sm rounded-md hover:text-blue-400 ${
                    viewMode === "single" ? "bg-[#0A2870] text-white" : "bg-gray-200 text-black"
                    }`}
                    onClick={() => handleModeChange("single")}
                >
                    Un à la fois
                </button>
                <button
                    className={`px-4 py-1 text-sm hover:text-blue-400 rounded-md ${
                    viewMode === "multiple" ? "bg-[#0A2870] text-white" : "bg-gray-200 text-black"
                    }`}
                    onClick={() => handleModeChange("multiple")}
                >
                    Plusieurs
                </button>
                <div className="flex flex-row ml-auto gap-2">
                    {(loading && <div className="flex flex-row justify-start py-0">
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                        <div className=" text-black  text-sm blink pt-1">Chargement...</div>
                    </div>)}
                    {error && <span className="py-0 text-red-500">{error}</span>}
                    <button
                        className="bg-[#C7D8FF] text-sm text-black px-4 py-1 hover:text-white hover:bg-[#0A2870] rounded-md ml-auto"
                        onClick={() => handleValidation()}
                    >
                        Valider
                    </button>
                </div>
            </div>
            {/* Champ de saisie selon le mode */}
            {viewMode === "single" ? (
            <input
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder={placeHolder ? placeHolder:"Entrer quelque chose"}
                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-[#ededed] mb-4"
            />
            ) : (
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeHolder ? placeHolder:"Entrer quelque chose"}
                className="w-full px-3 py-2 border rounded-md  text-gray-700 bg-[#ededed] mb-4"
            />)
            }
        </>
    );
}
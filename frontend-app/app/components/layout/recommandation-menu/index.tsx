import TabItem from "@/app/types/tab-item";
import { useState } from "react";

interface RecommandationMenuProps {
  handleTabChange: (type: string) => void;
  tabs: Array<TabItem>
}

export default function RecommandationMenu({
  handleTabChange, tabs
}: RecommandationMenuProps) {
  const [selectedType, setSelectedType] = useState<string>(tabs[0].id);

  const handleTypeChange = (type: string) => {
    handleTabChange(type); // Appelle la fonction passée en prop
    setSelectedType(type); // Met à jour l'état local
  };

  return (
      <div className="flex gap-4">
        {tabs.map((item) =>
            <button
                key = {Math.random()}
                className={`px-3 py-1 text-sm rounded-md ${
                    selectedType === item.id
                    ? "bg-[#0A2870] text-white"
                    : "bg-transparent text-[#0A2870]"
                }  hover:text-blue-400`}
                onClick={() => handleTypeChange(item.id)}
            >
            {item.name}
            </button>)
        }
      </div>
  );
}

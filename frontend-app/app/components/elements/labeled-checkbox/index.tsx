import {useState} from "react"

interface LabeledItemProps{
    isChecked: boolean
    category: string
    handleChange: (state:boolean) => void
}

export default function LabeledItem({isChecked, category, handleChange}:LabeledItemProps){

    const [inputState, setInputState] = useState<boolean>(isChecked);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = e.target.checked;
        setInputState(newState);
        handleChange(newState);
    };

    return (
        <label className="flex text-sm mr-2  items-center gap-2 text-[#0A2870]">
        <input
          type="checkbox"
          checked={inputState}
          onChange={handleInputChange}
          className="m-1 p-1 w-5 h-5 border-1 border-[#0A2870] rounded"
        />
        <span className="text-sm">{category}</span>
      </label>
    );
}
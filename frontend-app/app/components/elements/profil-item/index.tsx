
interface ProfilItemProps
{
    name: string
    index: number
    handleTagRemove: (index: number) => void;
    handleTagClick: (index:string) => void;
}

export default function ProfilItem({name, index, handleTagRemove, handleTagClick}:ProfilItemProps){
    return (
        <div key={index} className="flex items-center gap-1 border border-[#0a2870] px-2 py-0 rounded-md">
            <span className="px-3 text-sm text-[#0a2870] cursor-pointer" onClick={()=>handleTagClick(name)} >{name}</span>
            <button
                onClick={() => handleTagRemove(index)}
                className="text-[#0a2870] hover:text-blue-400"
            >
            ✕
            </button>
        </div>
    );
}
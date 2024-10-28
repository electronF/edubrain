import RecommandedGoals from "@/app/types/recommanded-goals";


interface RecommendedItemProps {
  recommendation: RecommandedGoals;
  status: "neutral" | "valid" | "invalid"
  handleStatusChange: (status: "neutral" | "valid" | "invalid") => void
}

export default function RecommendedItem({
  recommendation,
  handleStatusChange,
  status
}: RecommendedItemProps) {

  const borderColor = {
    neutral: "border-[#0A2870] border-1",
    valid: "border-[#90C418] border-[3px]",
    invalid: "border-[#FC4850] border-[3px]",
  };

  const buttonStyle = {
    valid: "bg-[#90C418] text-white",
    invalid: "bg-[#FC4850] text-white",
    neutral: "bg-transparent text-[#0A2870]",
  };

  return (
    <div
      className="flex flex-col py-1"
    >
      <div className={`text-gray-700 px-3 py-2 border rounded-md ${borderColor[status]} flex justify-between items-center`}>{recommendation.description}</div>
      <div className="flex gap-2 mt-1 flex-row justify-end">
        <button
          className={`px-4 py-1 rounded ${status === "valid" ? buttonStyle.valid : buttonStyle.neutral}`}
          onClick={() => handleStatusChange("valid")}
        >
          Valide
        </button>
        <button
          className={`px-4 py-1 rounded ${status === "invalid" ? buttonStyle.invalid : buttonStyle.neutral}`}
          onClick={() => handleStatusChange("invalid")}
        >
          Non valide
        </button>
        <button
          className={`px-4 py-1 rounded ${buttonStyle.neutral}`}
          onClick={() => handleStatusChange("neutral")}
        >
          Neutre
        </button>
      </div>
    </div>
  );
}

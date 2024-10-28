interface RecommandedGoal
{
  id: number 
  description: string
  priority?: number
  status: "neutral" | "valid" | "invalid"
  category?: string
  subCategory?: string
  subSubCategory?:string
  age?: number 
}

export default RecommandedGoal
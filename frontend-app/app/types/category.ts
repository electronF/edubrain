import SubCategory from "./sub-category"

interface Category 
{
    name: string
    isChecked: boolean
    children: Array<SubCategory>
}


export default Category
import React, { useState } from "react";
import LabeledItem from "../../elements/labeled-checkbox";

import Category from "@/app/types/category";
import SubCategory from "@/app/types/sub-category";
import { capitalize } from "@/app/tools/functions";

interface CategoriesMenuProps
{
    categories: Array<Category>
    handleMenuItemChange: (item:Category) => void
}


export default function CategoriesMenu({categories, handleMenuItemChange}:CategoriesMenuProps) {
  const [menuCategoriesAndStates, setMenuCategoriesAndStates] = useState<Category[]>(categories);
  const mapState:Map<string, boolean> = new Map<string, boolean>();
  for(const item of categories){
    mapState.set(item.name, false); 
  }
  const [displayHideButtonState, setDisplayHideButtonState] = useState<Map<string, boolean>>(mapState);
  

  const handleCategoryChange = (item:Category , state:boolean) => {
    const newMenuItem = [...menuCategoriesAndStates]
    for(const menuItem of newMenuItem)
    {
        if (menuItem === item ){
            for(const subItem of menuItem.children)
            {
                subItem.isChecked = state   
            }
            item = menuItem
            menuItem.isChecked = !menuItem.isChecked
            break
        }
    }
    setMenuCategoriesAndStates(newMenuItem);
    handleMenuItemChange(item);
  };

  const handleSubCategoryChange = (item:Category, subItem:SubCategory, state:boolean) => {
    const newMenuItem = [...menuCategoriesAndStates]
    for(const menuItem of newMenuItem)
    {
        if (menuItem === item ){
            for(const subMenuItem of menuItem.children)
            {
                if(subMenuItem === subItem)
                {
                    subItem.isChecked = state
                    break
                }   
            }
            item = menuItem
            break
        }
    }
    setMenuCategoriesAndStates(newMenuItem);
    handleMenuItemChange(item);
  };

  const handleChangeVisibility = (name:string)=>{
    const mapState:Map<string, boolean> = new Map<string, boolean>();
    for(const key of displayHideButtonState.keys()){
        if(name == key){
            mapState.set(key, !displayHideButtonState.get(key));
        }
        else {
            mapState.set(key, displayHideButtonState.get(key));
        }
    }
    setDisplayHideButtonState(mapState);
  }

  return (
    <div className="rounded-md">
      {/* Label */}
      <label className="block text-[14px] font-semibold text-gray-600 mb-2">
        Categories
      </label>

      {/* Liste de cases à cocher */}
      <div className="flex">
        <ul className="flex flex-col gap-2">
            {menuCategoriesAndStates.map((item) => (
            <li key={Math.random()+Math.random()}> 
                <div className="flex flex-row flex-nowrap">
                    <LabeledItem 
                    category={capitalize(item.name)} 
                    isChecked={item.isChecked} 
                    handleChange={(state)=>handleCategoryChange(item, state)}
                    /> 
                    <button onClick={() => handleChangeVisibility(item.name)} className="text-sm bg-gray-300  py-1 px-2 ml-auto text-[#0A2870] hover:text-[#5b70a3] rounded-md" >{(displayHideButtonState.get(item.name)==false)?"Afficher":"Masquer"}</button>
                </div>
                {(displayHideButtonState.get(item.name)==false)?null:
                <ul>
                    {item.children.map((subItem)=><li className="ml-4" key={Math.random()+Math.random()}>
                        <LabeledItem  
                            category={capitalize(subItem.name)} 
                            isChecked={subItem.isChecked} 
                            handleChange={(subItemState)=>handleSubCategoryChange(item, subItem, subItemState)}
                        />
                    </li>
                    )}
                </ul>}
            </li>

            ))}
        </ul>
      </div>
    </div>
  );
}

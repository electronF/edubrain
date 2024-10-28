interface GetListOfCategoryProps
{
    data: Map<string, string>[]
}

export default function getListOfCategory({data}:GetListOfCategoryProps){
    // [
    //     {   
    //         name:"lecture",
    //         isChecked: true, 
    //         children:[
    //             {name:"subpart 1", isChecked:true}, 
    //             {name:"subpart 2", isChecked:true}, 
    //             {name:"subpart 3", isChecked:true}
    //         ]
    //     },
    //     {   
    //         name:"écriture",
    //         isChecked: true, 
    //         children:[
    //             {name:"subpart 1", isChecked:true}, 
    //             {name:"subpart 2", isChecked:true}, 
    //             {name:"subpart 3", isChecked:true}
    //         ]
    //     },
    //     {   
    //         name:"mathématiques",
    //         isChecked: true, 
    //         children:[
    //             {name:"subpart 1", isChecked:true}, 
    //             {name:"subpart 2", isChecked:true}, 
    //             {name:"subpart 3", isChecked:true}
    //         ]
    //     } 
    //   ];
    return data
}
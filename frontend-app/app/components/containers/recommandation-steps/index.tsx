import React from 'react';

// Importation des composants nécessaires
import {
    SubTitleComponent,
    OutputMessageComponent,
    SuccessMessageComponent,
    SimpleTitleComponent,
    DataFrameComponent,
    WriteNothingComponent,
    TitleComponent,
    SubTitleSuccessComponent,
    SubTitleErrorComponent,
    StepMessageComponent,
    ErrorMessageComponent,
    ProgressToolsComponent
  }
  from "../../elements/little-component"
import RecommandationStepItem from '@/app/types/recommandation-step-item';

// Interface pour le composant DynamicRenderer
interface DynamicRendererProps {
  data: RecommandationStepItem[];
}

// Dictionnaire pour mapper chaque type au composant correspondant
// Dictionnaire pour mapper chaque type au composant correspondant
const componentMap: { [key: string]: React.FC<any> } = {
    title: TitleComponent,
    sub_title: SubTitleComponent,
    sub_title_success: SubTitleSuccessComponent,
    sub_title_error: SubTitleErrorComponent,
    step_message: StepMessageComponent,
    success_message: SuccessMessageComponent,
    error_message: ErrorMessageComponent,
    progress_tools: ProgressToolsComponent,
    simple_title: SimpleTitleComponent,
    dataframe: DataFrameComponent,
    ouptut_message: OutputMessageComponent,
    write: WriteNothingComponent,
  };
  

export default function RecommandationSteps({ data }:DynamicRendererProps){
  return (
    <div className='flex flex-col'>
      {data.map((item, index) => {
        const Component = componentMap[item.type];

        // Si aucun composant ne correspond, ignorer l'élément
        if (!Component) return null;
        if (item.value === null || item.value === undefined){
          return null
        }
        return (
          <div key={index}>
            <Component content={item.value} />
          </div>
        );
      })}
    </div>
  );
};
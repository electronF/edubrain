import { ReactNode } from 'react'; 

import "./index.scss"

interface RecommandationsSideProps {
  children?: ReactNode; // Déclaration de la prop children
}

export default function RecommandationsSide({children}:RecommandationsSideProps) {
    return (
      <div className="flex flex-col recommandations-side"> 
        {children}
      </div>
    );
}
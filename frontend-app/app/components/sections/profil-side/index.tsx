import { ReactNode } from 'react'; 

import "./index.scss"

interface ProfilSideProps {
  children?: ReactNode; // Déclaration de la prop children
}

export default function ProfilSide({ children }: ProfilSideProps) {
    return (<div className="flex flex-col profil-side"> 
        {children}
      </div>);
}
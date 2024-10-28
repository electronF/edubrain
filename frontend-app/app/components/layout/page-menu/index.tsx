import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import logo from '@/public/eduplan-logo.webp'; // Chemin de ton logo SVG dans le dossier public
import logo_edubrain from '@/public/logo-edubrain.webp'; // Chemin de ton logo SVG dans le dossier public



interface PageMenuProps {
    activeTab?: string;
}

export default function Header({props}:PageMenuProps) {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>(router.pathname==undefined?(props==undefined?'':props):'');

  const handleNavigation = (page: string) => {
    setActivePage(page);
    router.push(page);
  };

  return (
    <header className="flex justify-start items-center p-4">
      {/* Logo Placeholder */}
      <div className="logo w-60">
        <Image src={logo_edubrain} alt="Eduplan Logo" width={500} height={200} priority />
      </div>

      {/* Menu de Navigation */}
      <nav className="flex ml-40 gap-4 ">
        <button
          className={`px-4 py-1 rounded-md text-md font-medium  hover:text-blue-400 ${
            (activePage === '' || activePage == 'test')
              ? 'bg-[#0A2870] text-white'
              : 'bg-transparent text-[#0A2870]'
          }`}
          onClick={() => handleNavigation('/test')}
        >
          Test
        </button>

        <button
          className={`px-4 py-1 rounded-md text-md font-medium  hover:text-blue-400 ${
            activePage === '/documentation'
              ? 'bg-[#0A2870] text-white'
              : 'bg-transparent text-[#0A2870]'
          }`}
          onClick={() => handleNavigation('/documentation')}
        >
          Documentation
        </button>
      </nav>
    </header>
  );
}

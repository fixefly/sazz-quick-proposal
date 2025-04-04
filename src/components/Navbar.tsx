
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

const Navbar: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only render theme-specific content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {mounted && (resolvedTheme === 'dark' || theme === 'dark') ? (
            <img 
              src="/lovable-uploads/acf1b823-b78f-44fe-a14e-06f588e30a50.png" 
              alt="Proxob Logo" 
              className="h-10"
            />
          ) : (
            <img 
              src="/lovable-uploads/b9779a4e-2f53-4ff9-b45a-75558c5dbe15.png" 
              alt="Proxob Logo" 
              className="h-10"
            />
          )}
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className={theme === "dark" ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}>Home</Button>
          </Link>
          <Link to="/saved">
            <Button variant="ghost" className={theme === "dark" ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}>Saved Proposals</Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className={theme === "dark" ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}>Settings</Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

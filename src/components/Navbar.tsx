
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/b9779a4e-2f53-4ff9-b45a-75558c5dbe15.png" 
            alt="Proxob Logo" 
            className="h-10"
          />
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/saved">
            <Button variant="ghost">Saved Proposals</Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost">Settings</Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

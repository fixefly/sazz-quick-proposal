
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">FreeProp</span>
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

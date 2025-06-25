
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBackButton = true }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-belize-300 text-white shadow-md">
        <div className="page-container">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <span>FUE Optimizer Pro</span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="page-container py-6">
        {showBackButton && !isHomePage && (
          <Link to="/" className="back-button">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
        )}
        
        <h1 className="page-title">{title}</h1>
        
        {children}
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="page-container py-4">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} FUE Optimizer Pro
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

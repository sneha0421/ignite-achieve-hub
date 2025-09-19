import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Ignite Achieve</span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
            >
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            
            <Button
              variant={isActive("/student") ? "default" : "ghost"}
              asChild
            >
              <Link to="/student" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Student Dashboard</span>
              </Link>
            </Button>
            
            <Button
              variant={isActive("/faculty") ? "default" : "ghost"}
              asChild
            >
              <Link to="/faculty" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Faculty Panel</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
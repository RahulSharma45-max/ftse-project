import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-primary shadow-soft border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">FTSE Insight</h1>
              <p className="text-xs text-white/80">Market Analytics</p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 hover:text-white border-white/20 transition-smooth"
            >
              Login
            </Button>
            <Button 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 shadow-sm transition-smooth"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
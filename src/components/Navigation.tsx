import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, User, LogOut, Recycle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import LocationDisplay from "@/components/LocationDisplay";
import repairUpLogo from "@/assets/repairup-logo.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-black shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <img src={repairUpLogo} alt="RepairUp Logo" className="w-full h-full object-contain" />
                </div>
                <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-smooth cursor-pointer">
                  RepairUp
                </Link>
              </div>
              <div className="ml-10">
                <LocationDisplay />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Home
              </a>
              <Link to="/all-services" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                Services
              </Link>
              <Link to="/about" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                About
              </Link>
              <Link to="/dashboard?tab=ewaste" className="flex items-center bg-green-500 text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                <Recycle className="w-4 h-4 mr-1" />
                E-Waste
              </Link>
              <a href="#faq" className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-smooth">
                FAQ
              </a>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/book-now">
              <Button variant="default" size="sm" className="bg-black text-white dark:bg-white dark:text-black border-none shadow-md hover:bg-black/80 dark:hover:bg-white/80">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-card">
              <a href="#home" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Home
              </a>
              <Link to="/all-services" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Services
              </Link>
              <Link to="/about" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                About
              </Link>
              <a href="#faq" className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                FAQ
              </a>
              <div className="flex space-x-2 px-3 py-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
                <Link to="/book-now" className="flex-1">
                  <Button variant="default" size="sm" className="w-full bg-black text-white dark:bg-white dark:text-black border-none shadow-md hover:bg-black/80 dark:hover:bg-white/80">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
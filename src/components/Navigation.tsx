import { JSX, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const publicNavItems = [
    { name: "Game Rules", path: "/game-rules" },
    {
      name: "Discord",
      path: "https://discord.gg/mwgahF9z6q",
      target: "_blank",
    },
  ];

  const protectedNavItems = [
    { name: "Character Builder", path: "/character-builder" },
    { name: "Campaigns", path: "/campaigns" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-900/90 backdrop-blur-xs border-b border-brand-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">
              Daggerheart Tools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex h-full items-center space-x-8">
            {publicNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                target={item.target}
                className={`text-white hover:text-yellow-400 transition-colors h-full flex items-center justify-center ${
                  isActive(item.path) ? "text-yellow-400" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <>
                <div className="group relative text-white hover:text-yellow-400 transition-colors h-full flex items-center justify-center">
                  Homebrew
                  <div className="hidden divide-y-2 group-hover:flex flex-col gap-1 absolute top-full left-0 min-w-[250%] w-fit px-2 py-3 z-20 bg-brand-700 rounded-b-md backdrop-blur-lg">
                    <Link
                      to="/homebrew"
                      className={`text-white hover:text-yellow-400 transition-colors pb-2 hover:bg-brand-900/10 ${
                        isActive("/homebrew") ? "text-yellow-400" : ""
                      }`}
                    >
                      Create Homebrew
                    </Link>
                    <Link
                      to="/homebrewed/class"
                      className={`text-white hover:text-yellow-400 transition-colors ${
                        isActive("/homebrewed/class") ? "text-yellow-400" : ""
                      }`}
                    >
                      Homebrewed Classes
                    </Link>
                  </div>
                </div>

                {protectedNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-white hover:text-yellow-400 transition-colors h-full flex items-center justify-center ${
                      isActive(item.path) ? "text-yellow-400" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}
            {!user ? (
              <Link to="/auth">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Login
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              size="sm"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="text-white hover:text-yellow-400"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-brand-700/50">
            <div className="flex flex-col space-y-2">
              {publicNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={`text-white hover:text-yellow-400 transition-colors py-2 ${
                    isActive(item.path) ? "text-yellow-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user &&
                protectedNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={`text-white hover:text-yellow-400 transition-colors py-2 ${
                      isActive(item.path) ? "text-yellow-400" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              {!user ? (
                <Link
                  to="/auth"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mt-4">
                    Login
                  </Button>
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mt-4">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

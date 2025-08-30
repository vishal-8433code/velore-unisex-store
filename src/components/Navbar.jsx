import { useState } from "react";
import { ShoppingBag, Menu, X, User, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(3);
  const VeloreYellow = "hsl(44.13deg 100% 47.45%)";
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold font-serif tracking-wider text-glow"
            style={{ color: VeloreYellow }}
          >
            VELORÉ
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1 space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                style={({ isActive }) => ({
                  color: isActive ? VeloreYellow : "white",
                })}
                className="px-3 py-2 text-sm font-medium tracking-wide relative group smooth-transition hover:text-yellow-500"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 smooth-transition group-hover:w-full w-0" />
              </NavLink>
            ))}
          </div>

          {/* Right icons on desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-14">
            <NavLink
              to="/login"
              style={{ color: location.pathname === "/login" ? VeloreYellow : "white" }}
              className="text-white p-2"
            >
              <User className="h-5 w-5" />
            </NavLink>
            <NavLink
              to="/setting"
              style={{ color: location.pathname === "/setting" ? VeloreYellow : "white" }}
              className="text-white p-2"
            >
              <Settings className="h-5 w-5" />
            </NavLink>

            <NavLink
              to="/cart"
              style={{ color: location.pathname === "/cart" ? VeloreYellow : "white" }}
              className="relative text-white p-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium glow">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Hamburger menu button only on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-hover border-t border-border/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  style={({ isActive }) => ({
                    color: isActive ? VeloreYellow : "white",
                  })}
                  className="block px-3 py-2 text-base font-medium smooth-transition hover:text-yellow-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* User & Cart */}
              <NavLink
                to="/signup"
                style={{ color: location.pathname === "/signup" ? VeloreYellow : "white" }}
                className="block px-3 py-2 text-base font-medium smooth-transition hover:text-yellow-500"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>SignIn</span>
                </div>
              </NavLink>
              <NavLink
                to="/setting"
                style={{ color: location.pathname === "/setting" ? VeloreYellow : "white" }}
                className="block px-3 py-2 text-base font-medium smooth-transition hover:text-yellow-500"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Setting</span>
                </div>
              </NavLink>

              <NavLink
                to="/cart"
                style={{ color: location.pathname === "/cart" ? VeloreYellow : "white" }}
                className="block px-3 py-2 text-base font-medium smooth-transition hover:text-yellow-500 relative"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-2 right-4 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium glow">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { Link, NavLink } from "react-router";
import { FiHome, FiMail,FiMenu, FiLayers, FiPhone,FiMapPin,FiCompass } from "react-icons/fi";
import React, { useState, useEffect } from 'react';
import { Home, Mail, Menu, Layers, X, Phone, MapPin, Book } from 'lucide-react';
import headerLogo from '../assets/header_logo.png';

// Then use:
<img src={headerLogo} alt="Logo" className="w-5 h-5 object-contain" />
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navItems = [  
    { to: "/", label: "Home", icon: Home },
    { to: "/properties", label: "Properties", icon: Layers },
    { to: "/about", label: "About", icon: Book },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-orange-200/50' 
            : 'bg-gradient-to-r from-orange-50/90 via-white/95 to-orange-50/90 backdrop-blur-md shadow-lg'
        }`}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`,
          }}
        />

        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex justify-between items-center">
            {/* Logo with enhanced styling */}
            <a 
              href="/" 
              className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                {/* Glowing effect behind logo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
                
               {/* Logo with proper image handling */}
<div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
<img src={headerLogo} alt="Logo" className="w-9 h-9 object-contain" />
              </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                  Dynamic Realtors
                </span>
                <span className="text-xs text-slate-500 group-hover:text-orange-500 transition-colors duration-300">
                  Your Dream Home Awaits
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <a
                  key={item.to}
                  href={item.to}
                  className="group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50/50"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-blue-600/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-blue-600/10 rounded-xl transition-all duration-300" />
                  
                  <div className="relative flex items-center space-x-2">
                    {item.icon && (
                      <item.icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                    )}
                    <span className="relative">
                      {item.label}
                    </span>
                  </div>
                </a>
              ))}

              {/* CTA Button */}
              <div className="ml-6 pl-6 border-l border-slate-200">
              <a href="tel:+919867828977">
                <button className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                  
                    <Phone className="w-4 h-4 group-hover:animate-bounce" />
                   
                      <span>Call Now</span>
                  </span>
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-blue-600/10 border border-orange-200 hover:from-orange-500/20 hover:to-blue-600/20 transition-all duration-300 group"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 w-6 h-6 text-slate-700 group-hover:text-orange-600 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 w-6 h-6 text-slate-700 group-hover:text-orange-600 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <nav className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-200/50 p-6 space-y-2">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group block w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-orange-500 to-blue-600 shadow-lg transform scale-[0.98]' 
                        : 'text-slate-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50'
                    }`
                  }
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {({ isActive }) => (
                    <div className="flex items-center space-x-3">
                      {item.icon && (
                        <item.icon className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? 'animate-pulse' : 'group-hover:scale-110 group-hover:text-orange-500'
                        }`} />
                      )}
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Subtle bottom border animation */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </header>
    </>
  );
};

export default Header;
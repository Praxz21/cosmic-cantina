import React, { useState, useEffect } from 'react';
import { LogOut, User, ShoppingCart, Utensils, Crown, Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showCart = false, cartCount = 0, onCartClick }) => {
  const { user, signOut } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header 
      className="glass-morphism border-b border-white/15 fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: `blur(${Math.min(40 + scrollY * 0.1, 60)}px)`,
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, ${Math.min(0.06 + scrollY * 0.0001, 0.1)}) 0%, 
          rgba(255, 255, 255, ${Math.min(0.03 + scrollY * 0.00005, 0.05)}) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 py-2 sm:py-4">
          {/* Left side - Logo and Title */}
          <div className="flex items-center min-w-0 flex-1">
            <div 
              className="flex-shrink-0 flex items-center group"
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.01}deg) rotateY(${(mousePosition.x - 50) * 0.01}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cosmic-glow mr-2 sm:mr-4 group-hover:scale-110 transition-all duration-500 icon-glow relative overflow-hidden flex-shrink-0">
                <img src="/site-icon.png" alt="Cosmic Cantina" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="text-lg sm:text-xl font-bold cosmic-text tracking-wide">Cosmic Cantina</span>
                <div className="text-xs text-gray-400 font-medium">Digital Dining System</div>
              </div>
            </div>
            
            {/* Title - Hidden on mobile, shown on larger screens */}
            <div 
              className="ml-4 lg:ml-8 min-w-0 hidden md:block"
              style={{
                transform: `translateY(${scrollY * 0.02}px)`,
              }}
            >
              <h1 className="text-base lg:text-lg font-medium text-gray-200 truncate">{title}</h1>
            </div>
          </div>

          {/* Right side - Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            {showCart && (
              <button
                onClick={onCartClick}
                className="relative p-2 lg:p-3 text-gray-400 hover:text-white transition-all duration-300 hover-lift rounded-xl glass-morphism hover:bg-white/10 group magnetic-hover"
                style={{
                  transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.005}deg) rotateY(${(mousePosition.x - 50) * 0.005}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center font-bold pulse-glow bounce-in">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <div 
              className="flex items-center space-x-2 lg:space-x-3 glass-morphism-strong rounded-xl px-3 lg:px-4 py-2 lg:py-3 border border-white/15 hover-lift group"
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.005}deg) rotateY(${(mousePosition.x - 50) * 0.005}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
                  user?.role === 'staff' 
                    ? 'bg-yellow-500/15' 
                    : 'bg-blue-500/15'
                }`} style={{ 
                  boxShadow: user?.role === 'staff' 
                    ? '0 0 15px rgba(255, 149, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                    : '0 0 15px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                }}>
                  {user?.role === 'staff' ? (
                    <Crown className="w-3 h-3 lg:w-5 lg:h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                  ) : (
                    <Shield className="w-3 h-3 lg:w-5 lg:h-5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-xs lg:text-sm font-medium text-white group-hover:text-blue-300 transition-colors block truncate max-w-[120px] lg:max-w-none">
                    {user?.full_name}
                  </span>
                  {user?.role === 'student' && user?.registration_number && (
                    <div className="text-xs text-gray-400 hidden lg:block">({user.registration_number})</div>
                  )}
                  <div className={`text-xs capitalize font-medium transition-colors ${
                    user?.role === 'staff' ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-blue-400 group-hover:text-blue-300'
                  }`}>
                    {user?.role === 'staff' ? 'Staff' : 'Student'}
                  </div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-1 lg:p-2 text-gray-400 hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10 hover:scale-110 magnetic-hover ripple-effect flex-shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center space-x-2">
            {showCart && (
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-lg glass-morphism hover:bg-white/10"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-lg glass-morphism hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="mobile-menu sm:hidden border-t border-white/15 py-4 space-y-4">
            {/* Mobile Title */}
            <div className="px-2">
              <h1 className="text-lg font-medium text-gray-200">{title}</h1>
            </div>
            
            {/* Mobile User Info */}
            <div className="flex items-center space-x-3 px-2 py-3 glass-morphism rounded-xl border border-white/15">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                user?.role === 'staff' 
                  ? 'bg-yellow-500/15' 
                  : 'bg-blue-500/15'
              }`} style={{ 
                boxShadow: user?.role === 'staff' 
                  ? '0 0 15px rgba(255, 149, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 0 15px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              }}>
                {user?.role === 'staff' ? (
                  <Crown className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Shield className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-white block truncate">{user?.full_name}</span>
                {user?.role === 'student' && user?.registration_number && (
                  <div className="text-xs text-gray-400">({user.registration_number})</div>
                )}
                <div className={`text-xs capitalize font-medium ${
                  user?.role === 'staff' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {user?.role === 'staff' ? 'Staff Member' : 'Student'}
                </div>
              </div>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
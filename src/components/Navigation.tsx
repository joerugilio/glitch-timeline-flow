
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Mail } from 'lucide-react';
import siteConfig from '../data/site.json';
import type { SiteConfig } from '../types/site';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const config = siteConfig as SiteConfig;
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'User':
        return User;
      case 'Mail':
        return Mail;
      default:
        return User;
    }
  };

  const navItems = config.navigation.items.map(item => ({
    ...item,
    icon: getIconComponent(item.icon)
  }));
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav role="navigation" aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-lg border-0 ">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label="Portfolio home" className="text-xl font-bold hover:opacity-80 transition-opacity">
            {config.navigation.brand}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-card border-b border-border" role="menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`} 
                  onClick={() => setIsOpen(false)} 
                  role="menuitem" 
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

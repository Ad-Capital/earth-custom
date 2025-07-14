'use client';

import Rounded from "@/constants/RoundedButtons";
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Define types for props
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

interface MobileNavItemProps extends NavLinkProps {
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Handle effects when mobile menu state changes
  useEffect(() => {
    // Handle body scroll locking
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Handle escape key to close menu
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Handle click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (
        isMobileMenuOpen && 
        mobileMenu && 
        !mobileMenu.contains(event.target as Node) && 
        menuButton && 
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen(false);
  }, []);

  // Smooth scroll function with proper typing
  const smoothScroll = useCallback((href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only process anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace(/^#/, '');
      const section = document.getElementById(sectionId);
      
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 100, // Offset for header height
          behavior: 'smooth',
        });
        
        // Close mobile menu after navigation
        closeMobileMenu();
      }
    }
  }, [closeMobileMenu]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed mb-0 py-4 sm:px-14 px-6 bg-[#F3F3F3] top-0 w-full z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex justify-between items-center gap-8">
        <div className="w-[180px]">
          <Link href="/" aria-label="Home">
            <img src="/logo.svg" alt="Company Logo" className="w-[60px] h-[60px] object-contain" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8" role="navigation">
          <NavLink href="#about">About</NavLink>
          <Link href="/roadmap" className="font-bold nav">Roadmap</Link>
          <NavLink href="#FAQ">FAQs</NavLink>
          <NavLink href="#market">App</NavLink>
          <Link href="/" className="font-bold nav">Store</Link>
          <Link href="/custom-art" className="font-bold nav">Custom Art</Link>
        </div>
        
        <div className="hidden lg:flex">
          <Rounded>
            <p className='text-white font-bold'>Join Community</p>
          </Rounded>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-end items-center">
          <button
            id="menu-button"
            className="block lg:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <IoMdClose className="h-6 w-6 text-black" />
            ) : (
              <IoMdMenu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu bg-slate-50 lg:hidden fixed top-0 left-0 w-full h-full shadow z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full mobile-menu-gradient sm:px-12">
              <div className='flex flex-row w-full px-6 py-8'>
                <div className="w-[180px] h-[50px]">
                  <Link href="/" aria-label="Home">
                    <img src="/logo.svg" alt="Company Logo" className="w-[60px] h-[60px] object-contain" />
                  </Link>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    className="block lg:hidden"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <IoMdClose className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
              <div 
                className="flex flex-col gap-4 pt-[50px] text-white"
                role="menu"
              >
                <MobileNavItem href="#about" onClick={closeMobileMenu}>
                  About
                </MobileNavItem>
                <Link 
                  href="/roadmap" 
                  className="block pb-5 pl-10 font-bold w-full" 
                  onClick={closeMobileMenu}
                  role="menuitem"
                >
                  Roadmap
                </Link>
                <MobileNavItem href="#FAQ" onClick={closeMobileMenu}>
                  FAQs
                </MobileNavItem>
                <MobileNavItem href="#market" onClick={closeMobileMenu}>
                  App (Coming soon)
                </MobileNavItem>
                <Link 
                  href="/" 
                  className="block pb-5 pl-10 font-bold w-full" 
                  onClick={closeMobileMenu}
                  role="menuitem"
                >
                  Go to Store
                </Link>
                <Link 
                  href="/custom-art" 
                  className="block pb-5 pl-10 font-bold w-full" 
                  onClick={closeMobileMenu}
                  role="menuitem"
                >
                  Custom Art
                </Link>
                <div className='p-4'>
                  <Rounded>
                    <p className='font-bold'>Join the discord community</p>
                  </Rounded>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    className="block pb-5 pl-10 font-bold w-full" 
    onClick={(e) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.replace(/^#/, '');
        const section = document.getElementById(sectionId);
        
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth',
          });
          
          if (onClick) onClick();
        }
      } else if (onClick) {
        onClick();
      }
    }}
    role="menuitem"
  >
    {children}
  </a>
);

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "" }) => (
  <a 
    href={href} 
    className={`font-bold nav ${className}`} 
    onClick={(e) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.replace(/^#/, '');
        const section = document.getElementById(sectionId);
        
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }
    }}
  >
    {children}
  </a>
);

export default Navbar;
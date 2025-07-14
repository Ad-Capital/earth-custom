'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import RoundedButton from '@/constants/RoundedButtons';

interface NavItem {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '#howitworks', label: 'How it works', isExternal: true },
  // { href: '/pricing', label: 'Pricing' },
  { href: '#faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact', isExternal: true },
  { href: '/store', label: 'Store', isExternal: true },
];

const smoothScroll = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const sectionId = href.replace(/^#/, '');
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  onClick,
  className = 'font-bold nav'
}) => {
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          smoothScroll(href)(e);
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

const HamburgerButton = ({ isOpen, onClick, className = "" }: { isOpen: boolean; onClick: () => void; className?: string }) => (
  <button
    className={`lg:hidden flex justify-center items-center w-8 h-8 relative focus:outline-none ${className}`}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
    <div className="relative flex justify-center items-center w-full h-full">
      <span
        className={`absolute h-0.5 w-6 bg-[#1E0734] transform transition duration-300 ease-in-out origin-center
            ${isOpen ? 'rotate-45' : 'translate-y-[-8px]'}`}
      />
      <span
        className={`absolute h-0.5 w-6 bg-[#1E0734] transform transition-all duration-200 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      />
      <span
        className={`absolute h-0.5 w-6 bg-[#1E0734] transform transition duration-300 ease-in-out origin-center
            ${isOpen ? '-rotate-45' : 'translate-y-[8px]'}`}
      />
    </div>
  </button>
);

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, toggleMobileMenu]);

  return (
    <nav
      className="w-full py-8 sm:px-14 px-6"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="w-[180px] h-[50px]" aria-label="Home">
          <img
            src="/logo.svg"
            alt="Company logo"
            className="w-[60px] h-[60px] object-contain"
            width={60}
            height={60}
          />
        </Link>

        <div className="hidden lg:flex gap-[30px] text-[#1E0734]">
          {NAV_ITEMS.map(({ href, label, isExternal }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex">
          <Link href='/orderform'>
            <RoundedButton>
              <p>Order Now</p>
            </RoundedButton>
          </Link>

        </div>

        <div className="lg:hidden relative z-50">
          <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>

        <div
          id="mobile-menu"
          className={`
            fixed inset-0 bg-slate-50 lg:hidden
            z-40 overflow-hidden
            transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col h-full mobile-menu-gradient sm:px-12">
            <div className="flex justify-between items-center px-6 py-8">
              <Link href="/" aria-label="Home">
                <img
                  src="/logo.svg"
                  alt="Company logo"
                  className="w-[60px] h-[60px] object-contain"
                  width={60}
                  height={60}
                />
              </Link>
              {/* <div className="relative z-50" style={{ width: '32px', height: '32px' }}>
                <HamburgerButton
                  isOpen={true}
                  onClick={toggleMobileMenu}
                  className="absolute top-0 right-0"
                />
              </div> */}
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-20 text-[#1E0734]">
              {NAV_ITEMS.map(({ href, label }, index) => (
                <NavLink
                  key={href}
                  href={href}
                  onClick={toggleMobileMenu}
                  className={`
                    text-2xl font-bold transform transition-all duration-300
                    ${isMobileMenuOpen
                      ? `translate-y-0 opacity-100 transition-all duration-300 delay-[${index * 150}ms]`
                      : 'translate-y-8 opacity-0'
                    }
                  `}
                >
                  {label}
                </NavLink>
              ))}
              <div className={`
                p-4 transform transition-all duration-300
                ${isMobileMenuOpen
                  ? `translate-y-0 opacity-100 transition-all duration-300 delay-[${NAV_ITEMS.length * 150}ms]`
                  : 'translate-y-8 opacity-0'
                }
              `}>
                <Link href='/orderform'>
                  <RoundedButton>
                    <p className="font-bold">Order Now</p>
                  </RoundedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
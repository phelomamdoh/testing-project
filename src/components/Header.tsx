"use client";

import { useState } from "react";
import Link from "next/link";
import { headerContent } from "@/content";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-br from-primary-600 to-primary-900 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Always visible */}
            <Link
              href={headerContent.logo.link}
              className="text-xl md:text-2xl font-bold text-white hover:text-white/90 transition-colors duration-300"
              onClick={closeMenu}
            >
              {headerContent.logo.text}
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {headerContent.navigation.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-base md:text-lg font-medium text-white hover:text-white/90 transition-colors duration-300 whitespace-nowrap"
                >
                  {link.text}
                </Link>
              ))}
              <a
                href={headerContent.navigation.signIn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base whitespace-nowrap border-2 border-accent-400/20 hover:border-accent-300/40"
              >
                {headerContent.navigation.signIn.text}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-white hover:text-white/90 hover:bg-white/50 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-gradient-to-br from-primary-600 to-primary-900 backdrop-blur-md border-b border-white/20 shadow-xl z-40 md:hidden animate-slide-down">
            <nav className="flex flex-col py-4 px-6">
              {headerContent.navigation.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg font-medium text-white hover:text-white/90 py-3 border-b border-white/30 last:border-b-0 transition-colors duration-300"
                >
                  {link.text}
                </Link>
              ))}
              <a
                href={headerContent.navigation.signIn.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-accent-950 font-bold px-4 py-3 rounded-lg transition-all duration-300 mt-4 text-center shadow-lg border-2 border-accent-400/20 hover:border-accent-300/40"
              >
                {headerContent.navigation.signIn.text}
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-extrabold hover:text-primary-blue transition-colors duration-300">
          Pathfinder Pro
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/quiz" className="text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Find Your Path
          </Link>
          <Link href="/specializations" className="text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Explore Specializations
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link href="/quiz" className="block text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Find Your Path
          </Link>
          <Link href="/specializations" className="block text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Explore Specializations
          </Link>
        </div>
      )}
    </nav>
  );
}
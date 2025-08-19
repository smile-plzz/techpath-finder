"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SpecializationCard from '@/components/SpecializationCard';
import { Specialization } from '@/components/types';
import { SkeletonSpecializationGrid } from '@/components/SkeletonLoader';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function HomePage() {
  const [featuredSpecializations, setFeaturedSpecializations] = useState<Specialization[]>([]);
  const [allSpecializations, setAllSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedSpecializations() {
      try {
        const res = await fetch('/api/specializations');
        if (!res.ok) {
          throw new Error('Failed to fetch specializations');
        }
        const data = await res.json();
        // Take the first 3 specializations as featured
        setFeaturedSpecializations(data.specializations.slice(0, 3));
        setAllSpecializations(data.specializations);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchFeaturedSpecializations();
  }, []);

  return (
    <ErrorBoundary>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 leading-tight animate-fade-in-down">
          Pathfinder Pro
        </h1>
        <p className="text-lg md:text-xl text-center mb-12 max-w-2xl animate-fade-in-up">
          Discover your ideal tech career path with personalized recommendations and insights into various specializations.
        </p>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-20">
          <Link href="/quiz" className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 animate-scale-in">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg md:text-xl">
              Find Your Path
            </span>
          </Link>
          <Link href="/specializations" className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 animate-scale-in delay-100">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg md:text-xl">
              Explore Specializations
            </span>
          </Link>
        </div>

        <section className="w-full max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-white animate-fade-in-up delay-200">Featured Specializations</h2>
          {loading ? (
            <SkeletonSpecializationGrid />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSpecializations.map((spec) => (
                <SpecializationCard 
                  key={spec.id} 
                  specialization={spec} 
                  linkPath={`/specializations/${spec.id}`} 
                  buttonText="Learn More" 
                />
              ))}
            </div>
          )}
        </section>

        <section className="w-full max-w-5xl mt-20">
          <h2 className="text-4xl font-bold text-center mb-10 text-white animate-fade-in-up delay-300">Explore Career Growth by Specialization</h2>
          {loading ? (
            <SkeletonSpecializationGrid />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allSpecializations.map((spec) => (
                <SpecializationCard 
                  key={spec.id} 
                  specialization={spec} 
                  linkPath={`/specializations/${spec.id}#growth`} 
                  buttonText="View Growth" 
                />
              ))}
            </div>
          )}
        </section>
      </div>
      </main>
    </ErrorBoundary>
  );
}

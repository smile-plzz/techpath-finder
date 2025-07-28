"use client";

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Specialization {
  id: string;
  name: string;
  description: string;
}

export default function SpecializationsPage() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchSpecializations() {
      try {
        const res = await fetch('/api/specializations');
        if (!res.ok) {
          throw new Error('Failed to fetch specializations');
        }
        const data = await res.json();
        setSpecializations(data.specializations);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchSpecializations();
  }, []);

  const filteredSpecializations = specializations.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="text-2xl font-semibold">Loading specializations...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="text-2xl font-semibold text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-white">Explore All Specializations</h1>
        
        <div className="w-full mb-8">
          <input
            type="text"
            placeholder="Search specializations..."
            className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-blue transition-colors duration-300 shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSpecializations.length === 0 && !loading && !error ? (
          <p className="text-center text-gray-400 text-lg">No specializations found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecializations.map((spec) => (
              <Link key={spec.id} href={`/specializations/${spec.id}`} className="block group">
                <div className="bg-gray-800 rounded-xl shadow-xl p-7 border border-gray-700 group-hover:border-primary-blue transition-all duration-300 transform group-hover:-translate-y-1">
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-blue transition-colors duration-300">{spec.name}</h2>
                  <p className="text-gray-300 text-base leading-relaxed">{spec.description.substring(0, 120)}...</p>
                  <button className="mt-5 px-6 py-2 bg-primary-blue text-white rounded-full hover:bg-secondary-purple transition-colors duration-300 shadow-md text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SpecializationDetail from '@/components/SpecializationDetail';

interface Specialization {
  id: string;
  name: string;
  description: string;
  jobTitles: string[];
  requirements: string[];
  suitableFor: string[];
  averageSalary: string;
  skills: string[];
  tools: string[];
  challenges: string[];
  futureOutlook: string;
  certifications: string[];
  keyProjects: string[];
  growthTrajectory: string;
  externalResources: { name: string; url: string; }[];
}

export default function SpecializationDetailPage() {
  const params = useParams();
  const { id } = params;
  const [specialization, setSpecialization] = useState<Specialization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      async function fetchSpecialization() {
        try {
          const res = await fetch(`/api/specializations/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch specialization');
          }
          const data = await res.json();
          setSpecialization(data.specialization);
          setLoading(false);
        } catch (err) {
          setError((err as Error).message);
          setLoading(false);
        }
      }
      fetchSpecialization();
    }
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="text-2xl font-semibold">Loading specialization details...</div>
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

  if (!specialization) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="text-2xl font-semibold">Specialization not found.</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SpecializationDetail specialization={specialization} onBack={handleBack} />
      </div>
    </main>
  );
}

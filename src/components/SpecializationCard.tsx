import Link from 'next/link';
import { Specialization } from '../components/types';

interface SpecializationCardProps {
  specialization: Specialization;
  linkPath: string;
  buttonText: string;
}

export default function SpecializationCard({ specialization, linkPath, buttonText }: SpecializationCardProps) {
  return (
    <Link key={specialization.id} href={linkPath} className="block group">
      <div className="bg-gray-800 rounded-xl shadow-xl p-7 border border-gray-700 group-hover:border-primary-blue transition-all duration-300 transform group-hover:-translate-y-1">
        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-blue transition-colors duration-300">{specialization.name}</h2>
        <p className="text-gray-300 text-base leading-relaxed">{specialization.description.substring(0, 120)}...</p>
        <button className="mt-5 px-6 py-2 bg-primary-blue text-white rounded-full hover:bg-secondary-purple transition-colors duration-300 shadow-md text-sm font-semibold">
          {buttonText}
        </button>
      </div>
    </Link>
  );
}

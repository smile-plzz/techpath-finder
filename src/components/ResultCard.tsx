import React from 'react';
import { Specialization } from '@/data/specializations';

interface ResultCardProps {
  specialization: Specialization;
  rank: number;
  onViewDetails: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ specialization, rank, onViewDetails }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-7 border border-gray-700 hover:border-primary-blue transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <span className="text-primary-blue mr-3 text-3xl">#{rank}</span> {specialization.name}
        </h3>
        <button
          onClick={onViewDetails}
          className="px-6 py-2 bg-primary-blue text-white rounded-full hover:bg-secondary-purple transition-colors duration-300 shadow-md text-sm font-semibold"
        >
          View Details
        </button>
      </div>
      <p className="mt-2 text-gray-300 text-base leading-relaxed">{specialization.description.substring(0, 160)}...</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {specialization.jobTitles.slice(0, 3).map((job, index) => (
          <span key={index} className="bg-gray-700 text-gray-200 text-xs px-4 py-1.5 rounded-full font-medium">
            {job}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;

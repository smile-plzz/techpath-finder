import { Specialization } from './types';

interface ResultCardProps {
  specialization: Specialization;
  onViewDetails: (id: string) => void;
}

export default function ResultCard({ specialization, onViewDetails }: ResultCardProps) {
  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">
          {specialization.name}
        </h3>
        <button
          onClick={() => onViewDetails(specialization.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
      <p className="mt-2 text-gray-300">{specialization.description.substring(0, 120)}...</p>
    </div>
  );
}
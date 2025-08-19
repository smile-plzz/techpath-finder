import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  height = 'h-4', 
  width = 'w-full', 
  rounded = 'rounded' 
}) => (
  <div 
    className={`animate-pulse bg-gray-700 ${height} ${width} ${rounded} ${className}`}
    aria-hidden="true"
  />
);

export const SkeletonCard: React.FC = () => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-5/6 mb-2" />
    <Skeleton className="h-3 w-4/6" />
  </div>
);

export const SkeletonQuiz: React.FC = () => (
  <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 w-full max-w-2xl animate-pulse">
    <div className="mb-6">
      <Skeleton className="h-2 w-full mb-2" />
      <Skeleton className="h-2 w-3/4" />
    </div>
    <Skeleton className="h-8 w-1/3 mb-8" />
    <Skeleton className="h-4 w-full mb-8" />
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  </div>
);

export const SkeletonSpecializationGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

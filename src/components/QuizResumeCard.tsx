import React from 'react';
import { QuizProgress } from '@/hooks/useLocalStorage';

interface QuizResumeCardProps {
  progress: QuizProgress;
  totalQuestions: number;
  onResume: () => void;
  onStartFresh: () => void;
}

export default function QuizResumeCard({ 
  progress, 
  totalQuestions, 
  onResume, 
  onStartFresh 
}: QuizResumeCardProps) {
  const progressPercentage = (progress.answers.length / totalQuestions) * 100;
  const timeElapsed = Date.now() - progress.startTime;
  const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
  
  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30 mb-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quiz in Progress</h3>
            <p className="text-sm text-blue-300">
              Started {minutesElapsed > 0 ? `${minutesElapsed} minute${minutesElapsed !== 1 ? 's' : ''} ago` : 'just now'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">
            {progress.answers.length}/{totalQuestions}
          </div>
          <div className="text-xs text-blue-300">Questions answered</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onResume}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Resume Quiz</span>
        </button>
        <button
          onClick={onStartFresh}
          className="px-4 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          Start Fresh
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>💡 Your progress is automatically saved. You can close this page and return later to continue.</p>
      </div>
    </div>
  );
}

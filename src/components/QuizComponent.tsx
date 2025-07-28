"use client";

import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ProgressBar from './ProgressBar';
import ResultCard from './ResultCard';
import { Question, Specialization } from './types';

export default function QuizComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<{ id: string, score: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [questionsRes, specializationsRes] = await Promise.all([
          fetch('/api/questions'),
          fetch('/api/specializations'),
        ]);

        if (!questionsRes.ok || !specializationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [questionsData, specializationsData] = await Promise.all([
          questionsRes.json(),
          specializationsRes.json(),
        ]);

        setQuestions(questionsData.questions.slice(0, 10));
        setSpecializations(specializationsData.specializations);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (selectedOptions: string[]) => {
    const scores: { [key: string]: number } = {};
    specializations.forEach(spec => {
      scores[spec.id] = 0;
    });

    selectedOptions.forEach((optionId, qIndex) => {
      const question = questions[qIndex];
      const option = question.options.find(opt => opt.id === optionId);

      if (option) {
        option.specializations.forEach(spec => {
          scores[spec.id] += spec.weight;
        });
      }
    });

    const resultsArray = Object.entries(scores).map(([id, score]) => ({
      id,
      score
    })).sort((a, b) => b.score - a.score);

    setResults(resultsArray);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults([]);
    setShowResults(false);
    setSelectedSpecialization('');
  };

  const viewSpecializationDetails = (id: string) => {
    setSelectedSpecialization(id);
    setActiveTab('overview');
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="text-2xl font-semibold">Loading...</div>
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

  const currentQuestion = questions[currentQuestionIndex];
  const topSpecializations = results.slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center font-mono text-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-white">
          Tech Career Pathfinder
        </h1>

        {!showResults ? (
          currentQuestion && (
            <div ref={questionRef} tabIndex={-1} className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-10 border border-gray-700 w-full max-w-2xl animate-fade-in-up">
              <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
              <h2 className="text-2xl font-semibold mb-5 text-white">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <p className="text-lg mb-8 text-gray-300">{currentQuestion.text}</p>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className="w-full text-left p-5 border border-gray-600 rounded-lg bg-gray-700 text-white hover:bg-primary-blue hover:border-primary-blue transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 w-full max-w-2xl animate-fade-in-up">
            {!selectedSpecialization ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-white">Your Top Recommended Specializations</h2>
                <div className="space-y-4">
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topSpecializations.map(result => ({
                          name: specializations.find(s => s.id === result.id)?.name,
                          score: result.score,
                        }))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value: number) => [`Score: ${value}`, '']}
                        />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {topSpecializations.map((result) => {
                    const spec = specializations.find(s => s.id === result.id);
                    return spec ? <ResultCard key={result.id} specialization={spec} onViewDetails={viewSpecializationDetails} /> : null;
                  })}
                </div>
                <button
                  onClick={resetQuiz}
                  className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Start Over
                </button>
              </>
            ) : (
              <>
                {(() => {
                  const spec = specializations.find(s => s.id === selectedSpecialization);
                  return (
                    <div>
                      <button
                        onClick={() => setSelectedSpecialization('')}
                        className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to results
                      </button>
                      
                      <h2 className="text-2xl font-bold mb-4 text-white">{spec?.name}</h2>
                      <p className="text-gray-300 mb-6">{spec?.description}</p>
                      
                      {/* Tabs */}
                      <div className="border-b border-gray-700 mb-6">
                        <nav className="flex space-x-4">
                          <button 
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-3 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                          >
                            Overview
                          </button>
                          <button 
                            onClick={() => setActiveTab('skills')}
                            className={`py-2 px-3 ${activeTab === 'skills' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                          >
                            Skills & Tools
                          </button>
                          <button 
                            onClick={() => setActiveTab('career')}
                            className={`py-2 px-3 ${activeTab === 'career' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                          >
                            Career
                          </button>
                        </nav>
                      </div>
                      
                      {/* Tab Content */}
                      {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-blue-900 p-4 rounded-lg border border-blue-700">
                            <h3 className="font-semibold text-lg mb-2 text-blue-300">Common Job Titles</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.jobTitles.map(job => (
                                <li key={job}>{job}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-green-900 p-4 rounded-lg border border-green-700">
                            <h3 className="font-semibold text-lg mb-2 text-green-300">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.requirements.map(req => (
                                <li key={req}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-purple-900 p-4 rounded-lg border border-purple-700">
                            <h3 className="font-semibold text-lg mb-2 text-purple-300">Suitable For</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.suitableFor.map(trait => (
                                <li key={trait}>{trait}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700">
                            <h3 className="font-semibold text-lg mb-2 text-yellow-300">Average Salary</h3>
                            <p className="text-xl font-bold text-gray-200">{spec?.averageSalary}</p>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'skills' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-indigo-900 p-4 rounded-lg border border-indigo-700">
                            <h3 className="font-semibold text-lg mb-2 text-indigo-300">Key Skills</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.skills.map(skill => (
                                <li key={skill}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-teal-900 p-4 rounded-lg border border-teal-700">
                            <h3 className="font-semibold text-lg mb-2 text-teal-300">Tools & Technologies</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.tools.map(tool => (
                                <li key={tool}>{tool}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-red-900 p-4 rounded-lg border border-red-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-red-300">Challenges</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.challenges.map(challenge => (
                                <li key={challenge}>{challenge}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'career' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-emerald-900 p-4 rounded-lg border border-emerald-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-emerald-300">Future Outlook</h3>
                            <p className="text-gray-200">{spec?.futureOutlook}</p>
                          </div>
                          
                          <div className="bg-blue-900 p-4 rounded-lg border border-blue-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-blue-300">Key Projects/Applications</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.keyProjects?.map(project => (
                                <li key={project}>{project}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-purple-900 p-4 rounded-lg border border-purple-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-purple-300">Growth Trajectory</h3>
                            <p className="text-gray-200">{spec?.growthTrajectory}</p>
                          </div>
                          
                          <div className="bg-amber-900 p-4 rounded-lg border border-amber-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-amber-300">Recommended Certifications</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.certifications.map(cert => (
                                <li key={cert}>{cert}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 md:col-span-2">
                            <h3 className="font-semibold text-lg mb-2 text-gray-300">External Resources</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                              {spec?.externalResources?.map(resource => (
                                <li key={resource.url}>
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {resource.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => setSelectedSpecialization('')}
                        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Back to Results
                      </button>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
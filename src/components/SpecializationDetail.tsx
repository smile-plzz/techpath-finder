import React, { useState, useEffect } from 'react';
import { Specialization } from '../components/types'; // Updated import path
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { CareerPathStep, CareerJump, SpecializationCareerData } from '@/data/careerGrowth';

interface SpecializationDetailProps {
  specialization: Specialization;
  onBack: () => void;
}

const SpecializationDetail: React.FC<SpecializationDetailProps> = ({ specialization, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [careerGrowthData, setCareerGrowthData] = useState<SpecializationCareerData | null>(null);
  const [loadingCareerData, setLoadingCareerData] = useState(true);
  const [careerDataError, setCareerDataError] = useState<string | null>(null);
  const [allSpecializations, setAllSpecializations] = useState<Specialization[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [careerRes, specializationsRes] = await Promise.all([
          fetch('/api/career-growth'),
          fetch('/api/specializations'),
        ]);

        if (!careerRes.ok) {
          throw new Error('Failed to fetch career growth data');
        }
        if (!specializationsRes.ok) {
          throw new Error('Failed to fetch specializations data');
        }

        const careerData = await careerRes.json();
        const specializationsData = await specializationsRes.json();

        const currentSpecCareerData = careerData.careerGrowthData.find(
          (item: SpecializationCareerData) => item.specializationId === specialization.id
        );
        setCareerGrowthData(currentSpecCareerData || null);
        setAllSpecializations(specializationsData.specializations);
        setLoadingCareerData(false);
      } catch (err) {
        setCareerDataError((err as Error).message);
        setLoadingCareerData(false);
      }
    }

    fetchData();
  }, [specialization.id]);

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-primary-blue hover:text-secondary-purple transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Specializations
      </button>
      
      <h2 className="text-4xl font-bold mb-6 text-white">{specialization.name}</h2>
      <p className="text-gray-300 mb-10 text-lg leading-relaxed">{specialization.description}</p>
      
      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-4 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-shrink-0 py-2 px-3 ${activeTab === 'overview' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`flex-shrink-0 py-2 px-3 ${activeTab === 'skills' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Skills & Tools
          </button>
          <button 
            onClick={() => setActiveTab('career')}
            className={`flex-shrink-0 py-2 px-3 ${activeTab === 'career' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Career
          </button>
          <button 
            onClick={() => setActiveTab('growth')}
            className={`flex-shrink-0 py-2 px-3 ${activeTab === 'growth' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Career Growth
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-primary-blue transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-secondary-purple opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-primary-blue group-hover:text-white transition-colors duration-300">Common Job Titles</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.jobTitles.map(job => (
                <li key={job}>{job}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-accent-green transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-accent-green group-hover:text-white transition-colors duration-300">Requirements</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.requirements.map(req => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-secondary-purple transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-purple to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-secondary-purple group-hover:text-white transition-colors duration-300">Suitable For</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.suitableFor.map(trait => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-yellow-400 group-hover:text-white transition-colors duration-300">Average Salary</h3>
            <p className="text-2xl font-bold text-gray-100">{specialization.averageSalary}</p>
          </div>
        </div>
      )}
      
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-indigo-400 group-hover:text-white transition-colors duration-300">Key Skills</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 group hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-teal-400 group-hover:text-white transition-colors duration-300">Tools & Technologies</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.tools.map(tool => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-red-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-red-400 group-hover:text-white transition-colors duration-300">Challenges</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.challenges.map(challenge => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'career' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-lime-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-emerald-400 group-hover:text-white transition-colors duration-300">Future Outlook</h3>
            <p className="text-gray-200 leading-relaxed">{specialization.futureOutlook}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-blue-400 group-hover:text-white transition-colors duration-300">Key Projects/Applications</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.keyProjects?.map(project => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-fuchsia-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-purple-400 group-hover:text-white transition-colors duration-300">Growth Trajectory</h3>
            <p className="text-gray-200 leading-relaxed">{specialization.growthTrajectory}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-amber-400 group-hover:text-white transition-colors duration-300">Recommended Certifications</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.certifications.map(cert => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2 group hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <h3 className="font-semibold text-xl mb-3 text-gray-300 group-hover:text-white transition-colors duration-300">External Resources</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              {specialization.externalResources?.map(resource => (
                <li key={resource.url}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="space-y-8 animate-fade-in-up">
          {loadingCareerData ? (
            <div className="text-center text-gray-400">Loading career growth data...</div>
          ) : careerDataError ? (
            <div className="text-center text-red-500">Error: {careerDataError}</div>
          ) : careerGrowthData ? (
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">Career Ladder</h3>
                <div className="space-y-6">
                  {careerGrowthData.careerPaths.map((step, index) => (
                    <div key={step.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                      <h4 className="text-xl font-semibold text-primary-blue mb-2">{index + 1}. {step.title}</h4>
                      <p className="text-gray-300 mb-2">{step.description}</p>
                      {step.averageSalaryRange && <p className="text-gray-400 text-sm">Salary: {step.averageSalaryRange}</p>}
                      <p className="text-gray-400 text-sm">Experience: {step.typicalYearsOfExperience}</p>
                      <p className="text-gray-400 text-sm mt-2">Skills: {step.requiredSkills.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-6 text-white mt-10">Inter-Career Jumps</h3>
                <div className="space-y-6">
                  {careerGrowthData.careerJumps.map((jump) => (
                    <div key={jump.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                      <h4 className="text-xl font-semibold text-secondary-purple mb-2">
                        Jump to {allSpecializations.find(s => s.id === jump.toSpecializationId)?.name || jump.toSpecializationId}
                      </h4>
                      <p className="text-gray-300 mb-2">Difficulty: <span className={`font-bold ${jump.transitionDifficulty === 'Easy' ? 'text-green-500' : jump.transitionDifficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{jump.transitionDifficulty}</span></p>
                      <p className="text-gray-400 text-sm">Common Skills: {jump.commonSkillsOverlap.join(', ')}</p>
                      {jump.notes && <p className="text-gray-400 text-sm mt-2">Notes: {jump.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">No career growth data available for this specialization yet.</div>
          )}
        </div>
      )}
      
      <button
        onClick={onBack}
        className="mt-10 px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-secondary-purple transition-colors duration-300 shadow-md text-lg font-semibold"
      >
        Back to Specializations
      </button>
    </div>
  );
};

export default SpecializationDetail;
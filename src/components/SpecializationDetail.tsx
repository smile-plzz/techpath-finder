import React from 'react';
import { Specialization } from '@/data/specializations';

interface SpecializationDetailProps {
  specialization: Specialization;
  onBack: () => void;
}

const SpecializationDetail: React.FC<SpecializationDetailProps> = ({ specialization, onBack }) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

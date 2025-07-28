export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  specializations: {
    id: string;
    weight: number;
  }[];
}

export interface Specialization {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Specialization } from './specializations';

export interface CareerPathStep {
  id: string;
  title: string;
  description: string;
  averageSalaryRange?: string;
  requiredSkills: string[];
  typicalYearsOfExperience: string;
}

export interface CareerJump {
  id: string;
  fromSpecializationId: string;
  toSpecializationId: string;
  commonSkillsOverlap: string[];
  transitionDifficulty: 'Easy' | 'Medium' | 'Hard';
  notes?: string;
}

export interface SpecializationCareerData {
  specializationId: string;
  careerPaths: CareerPathStep[];
  careerJumps: CareerJump[];
}

export const careerGrowthData: SpecializationCareerData[] = [
  {
    specializationId: 'ai-machine-learning',
    careerPaths: [
      {
        id: 'ai-ml-1',
        title: 'Junior ML Engineer',
        description: 'Focus on data preprocessing, model training, and basic deployment.',
        averageSalaryRange: '$70,000 - $100,000',
        requiredSkills: ['Python', 'Pandas', 'Scikit-learn', 'SQL'],
        typicalYearsOfExperience: '0-2 years',
      },
      {
        id: 'ai-ml-2',
        title: 'Mid-level ML Engineer',
        description: 'Develop and optimize complex ML models, participate in system design.',
        averageSalaryRange: '$100,000 - $150,000',
        requiredSkills: ['Deep Learning Frameworks (TensorFlow/PyTorch)', 'Cloud Platforms (AWS/Azure/GCP)', 'MLOps basics'],
        typicalYearsOfExperience: '2-5 years',
      },
      {
        id: 'ai-ml-3',
        title: 'Senior ML Engineer',
        description: 'Lead ML projects, design scalable ML systems, mentor junior engineers.',
        averageSalaryRange: '$150,000 - $200,000+',
        requiredSkills: ['Advanced ML Algorithms', 'Distributed Systems', 'Leadership', 'Project Management'],
        typicalYearsOfExperience: '5+ years',
      },
    ],
    careerJumps: [
      {
        id: 'ai-ml-to-data-science',
        fromSpecializationId: 'ai-machine-learning',
        toSpecializationId: 'big-data',
        commonSkillsOverlap: ['Python', 'Statistics', 'Data Analysis', 'SQL'],
        transitionDifficulty: 'Easy',
        notes: 'Strong overlap in data skills, requires more focus on statistical modeling and business intelligence.',
      },
      {
        id: 'ai-ml-to-robotics',
        fromSpecializationId: 'ai-machine-learning',
        toSpecializationId: 'robotics',
        commonSkillsOverlap: ['Python', 'Algorithms', 'Control Systems (basic)'],
        transitionDifficulty: 'Medium',
        notes: 'Requires learning about hardware, real-time systems, and robot kinematics.',
      },
    ],
  },
  {
    specializationId: 'cybersecurity',
    careerPaths: [
      {
        id: 'cs-1',
        title: 'Security Analyst',
        description: 'Monitor security systems, respond to incidents, perform vulnerability assessments.',
        averageSalaryRange: '$60,000 - $90,000',
        requiredSkills: ['Network Security', 'Incident Response', 'Vulnerability Scanning', 'Linux'],
        typicalYearsOfExperience: '0-3 years',
      },
      {
        id: 'cs-2',
        title: 'Security Engineer',
        description: 'Design, implement, and maintain security solutions and infrastructure.',
        averageSalaryRange: '$90,000 - $140,000',
        requiredSkills: ['Cloud Security', 'Security Architecture', 'Scripting (Python/Shell)', 'Compliance'],
        typicalYearsOfExperience: '3-7 years',
      },
      {
        id: 'cs-3',
        title: 'Security Architect',
        description: 'Develop high-level security designs and strategies for complex systems.',
        averageSalaryRange: '$140,000 - $200,000+',
        requiredSkills: ['Enterprise Security Architecture', 'Risk Management', 'Threat Modeling', 'Strategic Planning'],
        typicalYearsOfExperience: '7+ years',
      },
    ],
    careerJumps: [
      {
        id: 'cs-to-forensics',
        fromSpecializationId: 'cybersecurity',
        toSpecializationId: 'computer-forensics',
        commonSkillsOverlap: ['Network Analysis', 'Malware Analysis', 'Operating Systems'],
        transitionDifficulty: 'Easy',
        notes: 'Focus shifts to evidence collection, analysis, and legal aspects.',
      },
      {
        id: 'cs-to-cloud',
        fromSpecializationId: 'cybersecurity',
        toSpecializationId: 'cloud-computing',
        commonSkillsOverlap: ['Network Security', 'Linux', 'Scripting'],
        transitionDifficulty: 'Medium',
        notes: 'Requires deep understanding of cloud provider security services and infrastructure.',
      },
    ],
  },
  {
    specializationId: 'ux-design',
    careerPaths: [
      {
        id: 'ux-1',
        title: 'Junior UX Designer',
        description: 'Assist in user research, create wireframes and prototypes, support usability testing.',
        averageSalaryRange: '$60,000 - $85,000',
        requiredSkills: ['Wireframing', 'Prototyping', 'User Research Basics', 'Figma/Sketch'],
        typicalYearsOfExperience: '0-2 years',
      },
      {
        id: 'ux-2',
        title: 'UX Designer',
        description: 'Conduct full user research, design user flows, create high-fidelity mockups, present designs.',
        averageSalaryRange: '$85,000 - $120,000',
        requiredSkills: ['Information Architecture', 'Interaction Design', 'Usability Testing', 'Design Systems'],
        typicalYearsOfExperience: '2-5 years',
      },
      {
        id: 'ux-3',
        title: 'Senior UX Designer',
        description: 'Lead design projects, define design strategy, mentor junior designers, collaborate with product and engineering.',
        averageSalaryRange: '$120,000 - $160,000+',
        requiredSkills: ['UX Strategy', 'Service Design', 'Leadership', 'Stakeholder Management'],
        typicalYearsOfExperience: '5+ years',
      },
    ],
    careerJumps: [
      {
        id: 'ux-to-frontend',
        fromSpecializationId: 'ux-design',
        toSpecializationId: 'web-development', // Assuming a generic web dev specialization exists or can be added
        commonSkillsOverlap: ['HTML', 'CSS', 'JavaScript (basic)', 'Prototyping Tools'],
        transitionDifficulty: 'Medium',
        notes: 'Requires strong coding skills and understanding of frontend frameworks.',
      },
    ],
  },
  {
    "specializationId": "computer-forensics",
    "careerPaths": [
      {
        "id": "cf-path-001",
        "title": "Junior Forensic Analyst",
        "description": "Assists in collecting and analyzing digital evidence from devices and networks for investigations. Supports senior analysts in data recovery and report preparation for legal or corporate use.",
        "averageSalaryRange": "$60,000 - $85,000",
        "requiredSkills": ["Digital Forensics Tools (e.g., EnCase, FTK)", "Basic Cybersecurity", "Data Recovery"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "cf-path-002",
        "title": "Senior Forensic Analyst",
        "description": "Leads digital investigations, recovers complex evidence, and provides expert testimony in court. Ensures proper evidence handling and collaborates with legal teams.",
        "averageSalaryRange": "$90,000 - $120,000",
        "requiredSkills": ["Advanced Forensics Analysis", "Incident Response", "Legal Documentation"],
        "typicalYearsOfExperience": "3-5 years"
      },
      {
        "id": "cf-path-003",
        "title": "Forensics Team Lead",
        "description": "Manages a team of forensic analysts, develops investigation protocols, and oversees compliance with legal standards in large-scale cybercrime cases.",
        "averageSalaryRange": "$120,000 - $160,000",
        "requiredSkills": ["Team Leadership", "Advanced Cybersecurity", "Regulatory Compliance"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "cf-jump-001",
        "fromSpecializationId": "computer-forensics",
        "toSpecializationId": "cybersecurity",
        "commonSkillsOverlap": ["Cybersecurity Principles", "Incident Response"],
        "transitionDifficulty": "Medium",
        "notes": "Transition requires deeper knowledge of network security and threat mitigation, often gained through certifications like CISSP."
      },
      {
        "id": "cf-jump-002",
        "fromSpecializationId": "computer-forensics",
        "toSpecializationId": "big-data",
        "commonSkillsOverlap": ["Data Analysis", "Python"],
        "transitionDifficulty": "Hard",
        "notes": "Requires learning big data frameworks like Hadoop or Spark, as well as statistical modeling for large datasets."
      }
    ]
  },
  {
    "specializationId": "robotics",
    "careerPaths": [
      {
        "id": "robo-path-001",
        "title": "Robotics Technician",
        "description": "Assembles and tests robotic components, focusing on hardware and basic software integration. Supports prototyping and troubleshooting efforts.",
        "averageSalaryRange": "$50,000 - $75,000",
        "requiredSkills": ["Python", "Mechanical Assembly", "Basic Electronics"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "robo-path-002",
        "title": "Robotics Engineer",
        "description": "Designs and programs robotic systems for applications like manufacturing or healthcare. Integrates sensors and AI for enhanced functionality.",
        "averageSalaryRange": "$80,000 - $110,000",
        "requiredSkills": ["Robotics Programming (ROS)", "Sensor Integration", "Machine Learning"],
        "typicalYearsOfExperience": "2-5 years"
      },
      {
        "id": "robo-path-003",
        "title": "Senior Robotics Engineer",
        "description": "Leads robotics projects, develops advanced control algorithms, and oversees system integration for complex applications like autonomous systems.",
        "averageSalaryRange": "$120,000 - $160,000",
        "requiredSkills": ["Advanced AI", "System Architecture", "Project Management"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "robo-jump-001",
        "fromSpecializationId": "robotics",
        "toSpecializationId": "ai-machine-learning",
        "commonSkillsOverlap": ["Machine Learning", "Python"],
        "transitionDifficulty": "Medium",
        "notes": "Focus on expanding AI expertise, particularly in neural networks and deep learning frameworks like TensorFlow."
      },
      {
        "id": "robo-jump-002",
        "fromSpecializationId": "robotics",
        "toSpecializationId": "iot",
        "commonSkillsOverlap": ["Sensor Integration", "Embedded Systems"],
        "transitionDifficulty": "Medium",
        "notes": "Requires learning IoT protocols like MQTT and cloud integration for connected devices."
      }
    ]
  },
  {
    "specializationId": "cloud-computing",
    "careerPaths": [
      {
        "id": "cc-path-001",
        "title": "Cloud Support Engineer",
        "description": "Monitors and troubleshoots cloud infrastructure, assists clients with deployments, and ensures system availability.",
        "averageSalaryRange": "$70,000 - $95,000",
        "requiredSkills": ["AWS/Azure/GCP", "Linux Administration", "Basic Networking"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "cc-path-002",
        "title": "Cloud Engineer",
        "description": "Designs and manages cloud infrastructure, optimizes performance, and implements security measures for scalable solutions.",
        "averageSalaryRange": "$100,000 - $130,000",
        "requiredSkills": ["Cloud Architecture", "DevOps Tools (e.g., Kubernetes)", "Security Practices"],
        "typicalYearsOfExperience": "2-5 years"
      },
      {
        "id": "cc-path-003",
        "title": "Cloud Solutions Architect",
        "description": "Leads cloud strategy development, designs complex systems, and oversees enterprise-wide cloud migrations.",
        "averageSalaryRange": "$130,000 - $180,000",
        "requiredSkills": ["Advanced Cloud Design", "Strategic Planning", "Stakeholder Collaboration"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "cc-jump-001",
        "fromSpecializationId": "cloud-computing",
        "toSpecializationId": "cybersecurity",
        "commonSkillsOverlap": ["Security Practices", "Networking"],
        "transitionDifficulty": "Medium",
        "notes": "Transition involves gaining expertise in cybersecurity frameworks and threat detection tools."
      },
      {
        "id": "cc-jump-002",
        "fromSpecializationId": "cloud-computing",
        "toSpecializationId": "big-data",
        "commonSkillsOverlap": ["Cloud Infrastructure", "Data Processing"],
        "transitionDifficulty": "Easy",
        "notes": "Familiarity with cloud platforms makes learning big data tools like Spark or Snowflake straightforward."
      }
    ]
  },
  {
    "specializationId": "bioinformatics",
    "careerPaths": [
      {
        "id": "bio-path-001",
        "title": "Bioinformatics Technician",
        "description": "Manages biological databases, performs basic genomic data analysis, and supports research teams with computational tools.",
        "averageSalaryRange": "$60,000 - $85,000",
        "requiredSkills": ["Python", "R", "Genomics Basics"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "bio-path-002",
        "title": "Bioinformatics Analyst",
        "description": "Analyzes complex biological datasets, develops computational models, and contributes to genomic research findings.",
        "averageSalaryRange": "$90,000 - $120,000",
        "requiredSkills": ["Computational Biology", "Statistical Analysis", "Data Visualization"],
        "typicalYearsOfExperience": "2-5 years"
      },
      {
        "id": "bio-path-003",
        "title": "Senior Bioinformatics Scientist",
        "description": "Leads bioinformatics research, designs advanced algorithms, and collaborates with academic or industry partners on genomic projects.",
        "averageSalaryRange": "$120,000 - $160,000",
        "requiredSkills": ["Algorithm Development", "Genomics Expertise", "Project Leadership"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "bio-jump-001",
        "fromSpecializationId": "bioinformatics",
        "toSpecializationId": "big-data",
        "commonSkillsOverlap": ["Data Analysis", "Python"],
        "transitionDifficulty": "Easy",
        "notes": "Skills in large-scale data analysis transfer well to big data tools like Hadoop or Apache Spark."
      },
      {
        "id": "bio-jump-002",
        "fromSpecializationId": "bioinformatics",
        "toSpecializationId": "ai-machine-learning",
        "commonSkillsOverlap": ["Statistical Analysis", "Python"],
        "transitionDifficulty": "Medium",
        "notes": "Requires learning machine learning frameworks like TensorFlow or PyTorch for predictive modeling."
      }
    ]
  },
  {
    "specializationId": "game-design",
    "careerPaths": [
      {
        "id": "gd-path-001",
        "title": "Junior Game Developer",
        "description": "Codes basic game mechanics, assists in debugging, and supports design teams in creating interactive experiences.",
        "averageSalaryRange": "$55,000 - $80,000",
        "requiredSkills": ["Unity/C#", "Basic Game Design", "Debugging"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "gd-path-002",
        "title": "Game Developer",
        "description": "Develops core game features, optimizes performance, and collaborates with artists to deliver engaging gameplay.",
        "averageSalaryRange": "$85,000 - $110,000",
        "requiredSkills": ["Unreal Engine", "3D Modeling", "Game Physics"],
        "typicalYearsOfExperience": "2-5 years"
      },
      {
        "id": "gd-path-003",
        "title": "Lead Game Designer",
        "description": "Oversees game development projects, defines creative vision, and ensures technical and artistic alignment.",
        "averageSalaryRange": "$120,000 - $160,000",
        "requiredSkills": ["Project Management", "Advanced Game Design", "Team Leadership"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "gd-jump-001",
        "fromSpecializationId": "game-design",
        "toSpecializationId": "ux-design",
        "commonSkillsOverlap": ["User-Centered Design", "Prototyping"],
        "transitionDifficulty": "Medium",
        "notes": "Focus on learning UX research methods and tools like Figma to design user interfaces."
      },
      {
        "id": "gd-jump-002",
        "fromSpecializationId": "game-design",
        "toSpecializationId": "ai-machine-learning",
        "commonSkillsOverlap": ["Python", "Algorithm Development"],
        "transitionDifficulty": "Hard",
        "notes": "Requires significant training in AI and machine learning, particularly for NPC behavior or procedural content."
      }
    ]
  },
  {
    "specializationId": "big-data",
    "careerPaths": [
      {
        "id": "bd-path-001",
        "title": "Junior Data Engineer",
        "description": "Builds and maintains data pipelines, processes large datasets, and supports data analysts with accessible data.",
        "averageSalaryRange": "$80,000 - $110,000",
        "requiredSkills": ["SQL", "Python", "Hadoop Basics"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "bd-path-002",
        "title": "Data Engineer",
        "description": "Designs scalable data pipelines, optimizes big data systems, and ensures data integrity for analytics.",
        "averageSalaryRange": "$120,000 - $150,000",
        "requiredSkills": ["Apache Spark", "NoSQL Databases", "ETL Processes"],
        "typicalYearsOfExperience": "3-5 years"
      },
      {
        "id": "bd-path-003",
        "title": "Big Data Architect",
        "description": "Develops enterprise data strategies, designs big data architectures, and aligns solutions with business objectives.",
        "averageSalaryRange": "$150,000 - $200,000",
        "requiredSkills": ["Data Modeling", "Cloud Data Platforms", "Strategic Leadership"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "bd-jump-001",
        "fromSpecializationId": "big-data",
        "toSpecializationId": "cloud-computing",
        "commonSkillsOverlap": ["Cloud Infrastructure", "Data Processing"],
        "transitionDifficulty": "Easy",
        "notes": "Leverage familiarity with cloud platforms makes learning big data tools like Spark or Snowflake straightforward."
      },
      {
        "id": "bd-jump-002",
        "fromSpecializationId": "big-data",
        "toSpecializationId": "ai-machine-learning",
        "commonSkillsOverlap": ["Python", "Data Analysis"],
        "transitionDifficulty": "Medium",
        "notes": "Requires learning machine learning algorithms and tools like TensorFlow or PyTorch for predictive analytics."
      }
    ]
  },
  {
    "specializationId": "iot",
    "careerPaths": [
      {
        "id": "iot-path-001",
        "title": "IoT Developer",
        "description": "Develops software for connected devices, focusing on sensor integration and communication protocols for IoT systems.",
        "averageSalaryRange": "$65,000 - $90,000",
        "requiredSkills": ["Python", "IoT Protocols (e.g., MQTT)", "Embedded Systems"],
        "typicalYearsOfExperience": "0-2 years"
      },
      {
        "id": "iot-path-002",
        "title": "IoT Systems Engineer",
        "description": "Designs and implements IoT ecosystems, ensuring secure and scalable connectivity for smart devices.",
        "averageSalaryRange": "$95,000 - $125,000",
        "requiredSkills": ["Network Security", "Cloud Integration", "Device Management"],
        "typicalYearsOfExperience": "2-5 years"
      },
      {
        "id": "iot-path-003",
        "title": "IoT Solutions Architect",
        "description": "Leads IoT strategy, designs scalable architectures, and oversees deployment of smart systems across industries.",
        "averageSalaryRange": "$130,000 - $170,000",
        "requiredSkills": ["IoT Architecture", "Security Frameworks", "Project Leadership"],
        "typicalYearsOfExperience": "6-10 years"
      }
    ],
    "careerJumps": [
      {
        "id": "iot-jump-001",
        "fromSpecializationId": "iot",
        "toSpecializationId": "cloud-computing",
        "commonSkillsOverlap": ["Cloud Integration", "Networking"],
        "transitionDifficulty": "Easy",
        "notes": "Familiarity with cloud platforms makes transitioning to cloud architecture roles seamless."
      },
      {
        "id": "iot-jump-002",
        "fromSpecializationId": "iot",
        "toSpecializationId": "robotics",
        "commonSkillsOverlap": ["Embedded Systems", "Sensor Integration"],
        "transitionDifficulty": "Medium",
        "notes": "Requires learning robotics-specific programming like ROS and hardware integration."
      }
    ]
  }
];
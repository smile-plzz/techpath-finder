# TechPath Finder

A web application to help Computer Science Engineering (CSE) freshers choose specialized sectors for their careers.

## Features

- Interactive questionnaire about interests, skills, and preferences
- Enhanced Recommendation Algorithm with visual results (bar chart)
- Detailed information about 10 different CSE specializations, including key projects and growth trajectory
- Responsive design that works on mobile and desktop
- Expanded question set for more nuanced recommendations

## Specializations Covered

1. AI and Machine Learning
2. Robotics
3. Computer Forensics
4. Cybersecurity and Ethical Hacking
5. Video Game Design
6. Cloud Computing
7. Bioinformatics
8. UX Design
9. Big Data
10. Internet of Things (IoT)

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Recharts (for visualizations)
- **Backend**: Next.js API Routes
- **Deployment**: Git-based platforms (e.g., Vercel, Netlify)

## How It Works

The application uses a weighted scoring algorithm to match users with suitable specializations based on their responses to questions about:

- Interests
- Skills
- Work environment preferences
- Personality traits
- Career goals
- Ethical/Social Impact Preference
- Problem-Solving Approach
- Future Technology Trends

Each response adds weight to relevant specializations, and the top matches are presented to the user with detailed information and a visual comparison of scores.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd techpath-finder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/page.tsx`: Main application component (quiz logic, display, and results visualization)
- `src/app/layout.tsx`: Root layout component for the application
- `src/components/`: Reusable UI components
- `src/data/`: Data models and content
  - `specializations.ts`: Information about CSE specializations (now including key projects and growth trajectory)
  - `questions.ts`: Question flow and scoring weights (now with expanded questions)
- `src/app/api/`: Backend API routes

## API Endpoints

- `GET /api/specializations`: Get all specializations
- `GET /api/specializations/[id]`: Get a specific specialization
- `GET /api/questions`: Get all questions
- `GET /api/recommendations`: Get specializations and questions
- `POST /api/recommendations`: Calculate recommendations based on answers

## License

This project is open source and available under the MIT License.
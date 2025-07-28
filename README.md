# Pathfinder Pro

A comprehensive web application designed to guide individuals in discovering their ideal tech career path through personalized recommendations and detailed insights into various specializations.

## Features

- **Intuitive Landing Page**: A welcoming homepage offering clear paths to either take the career quiz or explore specializations directly.
- **Interactive Career Quiz**: A streamlined questionnaire (limited to 10 questions) that assesses user interests, skills, and preferences. Features a visual progress bar for enhanced user experience.
- **Enhanced Recommendation Algorithm**: Processes user answers to calculate and present a ranked list of suitable tech specializations, accompanied by a bar chart visualization for clearer comparison.
- **Comprehensive Specialization Directory**: Allows users to browse and search through a detailed list of tech specializations.
- **Detailed Specialization Information**: Provides comprehensive details for various tech specializations, including job titles, requirements, suitable candidate traits, average salary, key skills, tools & technologies, challenges, future outlook, recommended certifications, key projects/applications, growth trajectory, and external resources.
- **Unified UI/UX Design**: A consistent and modern dark theme with unified typography, refined color palette, standardized interactive elements, and subtle animations for a polished user experience.
- **Responsive Design**: The application is designed to be accessible and functional across various devices (mobile and desktop).

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Recharts (for visualizations)
- **Backend**: Next.js API Routes
- **Deployment**: Git-based platforms (e.g., Vercel, Netlify)

## How It Works

The application uses a weighted scoring algorithm to match users with suitable specializations based on their responses to a concise set of 10 questions covering:

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

- `src/app/page.tsx`: The new landing page, offering navigation to the quiz or specialization directory.
- `src/app/layout.tsx`: Root layout component for the application, now including the global `Navbar`.
- `src/app/quiz/page.tsx`: The main quiz component page.
- `src/app/specializations/page.tsx`: Page for listing all specializations with search functionality.
- `src/app/specializations/[id]/page.tsx`: Dynamic page for displaying individual specialization details.
- `src/components/Navbar.tsx`: Navigation bar component for consistent site-wide navigation.
- `src/components/ProgressBar.tsx`: Component for visually representing quiz progress with enhanced styling.
- `src/components/ResultCard.tsx`: Component for displaying a single recommendation result with improved visual appeal and hover effects.
- `src/components/SpecializationDetail.tsx`: Component for displaying detailed specialization information, now with enhanced card designs and colorful hover effects for sections.
- `src/data/`: Data models and content
  - `specializations.ts`: Information about CSE specializations.
  - `questions.ts`: Question flow and scoring weights.
- `src/app/api/`: Backend API routes

## API Endpoints

- `GET /api/specializations`: Get all specializations
- `GET /api/specializations/[id]`: Get a specific specialization
- `GET /api/questions`: Get all questions
- `GET /api/recommendations`: Get specializations and questions
- `POST /api/recommendations`: Calculate recommendations based on answers

## License

This project is open source and available under the MIT License.
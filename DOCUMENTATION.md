# TechPath Finder

A web application to help Computer Science Engineering (CSE) freshers choose specialized sectors for their careers.

## Detailed Documentation: TechPath Finder

### 1. Project Overview

The "TechPath Finder" is an interactive web application that guides CSE freshers towards suitable career specializations. It achieves this by presenting users with a series of questions about their interests, skills, preferences, and goals. Based on their responses, the application employs a weighted scoring algorithm to recommend the most relevant specializations, providing detailed information about each, now enhanced with visual comparisons.

### 2. Technology Stack

*   **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Recharts (for visualizations)
*   **Backend**: Next.js API Routes
*   **Deployment**: Git-based platforms (e.g., Vercel, Netlify)

### 3. Features

*   **Interactive Questionnaire**: Users answer a series of questions covering interests, skills, work environment preferences, personality traits, career goals, ethical/social impact, problem-solving approach, and future technology trends.
*   **Enhanced Recommendation Algorithm**: A core feature that processes user answers to calculate and present a ranked list of suitable CSE specializations, now accompanied by a bar chart visualization for clearer comparison.
*   **Detailed Specialization Information**: Provides comprehensive details for 10 different CSE specializations, including:
    *   Job Titles
    *   Requirements
    *   Suitable Candidate Traits
    *   Average Salary
    *   Key Skills
    *   Tools & Technologies
    *   Challenges
    *   Future Outlook
    *   Recommended Certifications
    *   **New:** Key Projects/Applications
    *   **New:** Growth Trajectory
*   **Responsive Design**: The application is designed to be accessible and functional across various devices (mobile and desktop).

### 4. Core Logic and Concepts

The application's recommendation system is built upon a weighted scoring mechanism.

#### 4.1. Data Structures

*   **`src/data/questions.ts`**: This file defines the structure and content of the questionnaire.
    *   `Question` Interface: Each question has an `id`, `text`, and an array of `options`.
    *   `Option` Interface: Each option has an `id`, `text`, and a `specializations` array.
    *   `specializations` Array within `Option`: This is crucial for the scoring. It contains objects with `id` (referencing a specialization) and `weight` (a numerical value indicating how strongly selecting this option contributes to that specialization's score).
    *   The `questions` array has been expanded to include new topics like ethical/social impact, problem-solving approach, and future technology trends.

*   **`src/data/specializations.ts`**: This file contains detailed information for each of the 10 CSE specializations.
    *   `Specialization` Interface: Each specialization has a unique `id`, `name`, `description`, and arrays for `jobTitles`, `requirements`, `suitableFor`, `skills`, `tools`, `challenges`, `certifications`, along with `averageSalary` and `futureOutlook` strings. New fields `keyProjects` and `growthTrajectory` have been added to provide more comprehensive insights.

#### 4.2. Recommendation Algorithm (`src/app/api/recommendations/route.ts`)

1.  **Initialization**: When a user starts the quiz, an empty score object is created, where each specialization's `id` is a key initialized to `0`.
2.  **Scoring**: As the user answers each question, the selected `optionId` is processed:
    *   The corresponding `question` and `option` objects are retrieved from `src/data/questions.ts`.
    *   For each specialization listed within the selected `option.specializations` array, its `weight` is added to the respective specialization's score in the `scores` object.
3.  **Result Calculation**: Once all questions are answered:
    *   The `scores` object is converted into an array of `{ id, score, specialization }` objects.
    *   This array is then sorted in descending order based on the `score`, presenting the highest-scoring specializations first.
4.  **Display**: The top recommended specializations (currently the top 3) are displayed to the user, now with an interactive bar chart visualization, allowing users to visually compare their top matches. Users can then view detailed information for each.

### 5. Project Structure

*   `techpath-finder/` (Project Root)
    *   `.gitattributes`: Git configuration for text file handling.
    *   `eslint.config.mjs`: ESLint configuration for code linting.
    *   `next-env.d.ts`: Next.js environment type definitions.
    *   `next.config.ts`: Next.js configuration file.
    *   `package-lock.json`: Records the exact versions of dependencies.
    *   `package.json`: Project metadata and scripts (updated name to `techpath-finder`).
    *   `postcss.config.mjs`: PostCSS configuration, primarily for Tailwind CSS.
    *   `README.md`: Project description, features, and setup instructions (updated).
    *   `tsconfig.json`: TypeScript compiler configuration.
    *   `.next/`: Build output directory (generated by Next.js).
    *   `node_modules/`: Installed Node.js modules.
    *   `public/`: Static assets (images, SVGs).
    *   `src/`: Source code directory
        *   `app/`: Next.js App Router pages and API routes
            *   `favicon.ico`: Application favicon.
            *   `globals.css`: Global CSS styles, including Tailwind CSS imports.
            *   `layout.tsx`: Root layout component for the application (updated title).
            *   `page.tsx`: Main application component (quiz logic, display, and now includes Recharts for results visualization).
            *   `api/`: API routes
                *   `questions/route.ts`: API endpoint for fetching questions.
                *   `recommendations/route.ts`: API endpoints for fetching and calculating recommendations.
                *   `specializations/`: API endpoints for fetching specialization details.
                    *   `[id]/route.ts`: API endpoint for fetching a single specialization by ID.
                    *   `route.ts`: API endpoint for fetching all specializations.
        *   `components/`: Reusable React components
            *   `ProgressBar.tsx`: Component for displaying quiz progress.
            *   `ResultCard.tsx`: Component for displaying a single recommendation result.
            *   `SpecializationDetail.tsx`: Component for displaying detailed specialization information.
        *   `data/`: Data models and content
            *   `questions.ts`: Defines the quiz questions and their associated specialization weights (expanded).
            *   `specializations.ts`: Defines the detailed information for each specialization (enhanced with `keyProjects` and `growthTrajectory`).

### 6. API Endpoints

The application utilizes Next.js API Routes for data fetching and recommendation calculations.

*   **`GET /api/specializations`**:
    *   **Purpose**: Retrieves a list of all available CSE specializations.
    *   **Logic**: Reads data from `src/data/specializations.ts` and returns it as a JSON response.
*   **`GET /api/specializations/[id]`**:
    *   **Purpose**: Retrieves detailed information for a specific specialization by its ID.
    *   **Logic**: Extracts the `id` from the URL path, searches `src/data/specializations.ts` for a matching specialization, and returns its details. Returns a 404 error if not found.
*   **`GET /api/questions`**:
    *   **Purpose**: Retrieves all quiz questions.
    *   **Logic**: Reads data from `src/data/questions.ts` and returns it as a JSON response.
*   **`GET /api/recommendations`**:
    *   **Purpose**: (Currently returns both specializations and questions) Could be used to pre-fetch data needed for the recommendation process.
    *   **Logic**: Returns a JSON object containing both `specializations` and `questions` data.
*   **`POST /api/recommendations`**:
    *   **Purpose**: Calculates and returns specialization recommendations based on user answers.
    *   **Logic**:
        *   Receives an array of `answers` (option IDs) in the request body.
        *   Validates the input format and length against the number of questions.
        *   Initializes scores for all specializations to zero.
        *   Iterates through the provided answers, finding the corresponding question and selected option.
        *   For each selected option, it iterates through its associated specializations and adds their respective `weight` to the total score of that specialization.
        *   Sorts the specializations by their calculated scores in descending order.
        *   Returns the sorted list of recommended specializations.

### 7. UI Components

*   **`src/app/page.tsx`**: This is the main client-side component that orchestrates the quiz flow. It manages the state for questions, answers, current question index, loading/error states, and displaying results or specialization details. It fetches data from the API routes and handles user interactions (option selection, quiz reset, viewing details). It now also incorporates a bar chart from `recharts` to visually represent the recommendation scores.
*   **`src/app/layout.tsx`**: Defines the root HTML structure and applies global styles and fonts.
*   **`src/components/ProgressBar.tsx`**: A simple component to visually represent the user's progress through the quiz.
*   **`src/components/ResultCard.tsx`**: Designed to display a summary of a recommended specialization in the results list.
*   **`src/components/SpecializationDetail.tsx`**: Provides a detailed view of a selected specialization, including all its attributes, now displaying the newly added `keyProjects` and `growthTrajectory` fields.

### 8. Development Log

This section outlines the key steps and decisions made during the development of the TechPath Finder application.

**Session Start: Thursday, July 24, 2025**

1.  **Project Initialization**: The user requested a new project with features from a reference Next.js application. An attempt to copy files was cancelled, and a fresh Next.js project was initiated.
    *   Initial `npx create-next-app` failed due to capital letters in the project name. The project name was changed to `choose-your-niche-new` (all lowercase).
    *   The `create-next-app` command was re-run with `--no-turbopack` to avoid interactive prompts.

2.  **Core File Migration**: Essential directories and files from the reference project were copied to the new project structure.
    *   `src/data/` (questions and specializations data)
    *   `src/app/api/` (API routes for questions, recommendations, and specializations)
    *   `src/components/` (reusable React components)

3.  **Configuration Updates**: The new project's configuration files were updated to match the reference project's setup and to reflect the new application name.
    *   `src/app/layout.tsx`: Updated metadata title and imported `Inter` font.
    *   `src/app/page.tsx`: Replaced the default Next.js boilerplate with the quiz application logic.
    *   `src/app/globals.css`: Adjusted CSS imports and variables to align with the reference project's styling.
    *   `package.json`: Updated `react`, `react-dom`, and `next` versions to match the reference project. The project `name` was also updated.

4.  **Dependency Installation**: `npm install` was run to ensure all project dependencies were correctly installed after `package.json` modifications.

5.  **Initial Build Verification**: A build was attempted to verify the project's integrity.
    *   **Issue**: Duplicate `NextResponse` import in `src/app/api/specializations/[id]/route.ts` caused a build failure.
    *   **Resolution**: The duplicate import was removed.
    *   **Issue**: Duplicate `specializations` import in `src/app/api/specializations/[id]/route.ts` caused a build failure.
    *   **Resolution**: The duplicate import was removed.
    *   **Result**: Build successful after resolving import conflicts.

6.  **Feature Enhancements - Naming**: The application name was updated.
    *   `package.json`: `name` changed to `techpath-finder`.
    *   `src/app/layout.tsx`: `title` changed to `TechPath Finder`.
    *   `src/app/page.tsx`: `h1` tag content changed to `TechPath Finder`.

7.  **Feature Enhancements - Visualizations**: A charting library was integrated to improve the display of recommendation results.
    *   `recharts` was installed (`npm install recharts`).
    *   `src/app/page.tsx`: Modified to import `recharts` components and render a `BarChart` on the results page, replacing the simple list for top specializations.

8.  **Feature Enhancements - Questions and Specialization Details**: The core data for the quiz and specializations was expanded.
    *   `src/data/questions.ts`: New questions were added to gather more nuanced user preferences (ethical/social impact, problem-solving approach, future trends).
    *   `src/data/specializations.ts`: The `Specialization` interface was extended with `keyProjects` and `growthTrajectory` fields. These new fields were populated for each specialization.
    *   `src/app/page.tsx`: The `Specialization` interface within `page.tsx` was updated to reflect the new fields, and the display logic was modified to show `keyProjects` and `growthTrajectory` in the specialization details view.

9.  **Final Build Verification**: A final build was performed to ensure all new features and changes were correctly integrated.
    *   **Result**: Build successful.

10. **Documentation Generation**: This `DOCUMENTATION.md` and `README.md` were updated to reflect all changes and the development process.

**Session End.**

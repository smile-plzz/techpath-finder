import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 leading-tight animate-fade-in-down">
          Pathfinder Pro
        </h1>
        <p className="text-lg md:text-xl text-center mb-12 max-w-2xl animate-fade-in-up">
          Discover your ideal tech career path with personalized recommendations and insights into various specializations.
        </p>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <Link href="/quiz" className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 animate-scale-in">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg md:text-xl">
              Find Your Path
            </span>
          </Link>
          <Link href="/specializations" className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 animate-scale-in delay-100">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg md:text-xl">
              Explore Specializations
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
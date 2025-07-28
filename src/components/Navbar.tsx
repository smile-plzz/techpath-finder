import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-extrabold hover:text-primary-blue transition-colors duration-300">
          Pathfinder Pro
        </Link>
        <div className="space-x-6">
          <Link href="/quiz" className="text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Find Your Path
          </Link>
          <Link href="/specializations" className="text-gray-300 hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
            Explore Specializations
          </Link>
        </div>
      </div>
    </nav>
  );
}

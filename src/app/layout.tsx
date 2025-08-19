import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pathfinder Pro',
  description: 'Discover your ideal tech career path with personalized recommendations and insights into various specializations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}

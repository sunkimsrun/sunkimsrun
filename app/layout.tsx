import { Inter, Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Sun Kimsrun | Full-Stack Software Engineer & Developer',
  description:
    'Software engineer specializing in high-performance full-stack web applications, microservices, databases, and security architecture.',
  keywords: [
    'Sun Kimsrun',
    'Full-Stack Developer',
    'Software Engineer',
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Portfolio',
  ],
  authors: [{ name: 'Sun Kimsrun' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  )
}

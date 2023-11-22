import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from './UserProvider'; // Path to your UserProvider
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Big Red Finds',
  description: 'FA23 Newbie Onboarding Project',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <UserProvider>
            {children}
          </UserProvider>
      </body>
    </html>
  );
}

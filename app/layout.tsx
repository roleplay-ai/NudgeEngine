import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CohortProvider } from './context/CohortContext';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nudgeable.ai',
  description: 'Nudgeable.ai L&D training engagement platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CohortProvider>
            {children}
          </CohortProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

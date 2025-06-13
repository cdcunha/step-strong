import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/providers';
import { ThemeToggle } from '@/components/theme-toggle';
import { SplashScreen } from '@/components/splash-screen';
import { VersionDisplay } from '@/components/version-display';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Step Strong - Foot & Calf Strengthening Program',
  description: 'A 5-week program to strengthen weak legs and improve mobility',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.className} h-full relative transition-colors duration-200`}>
        <SplashScreen />
        <PWAInstallPrompt />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('step-strong-theme') || 'light';
                  document.documentElement.classList.add(theme);
                  document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <Providers>
          <div className="min-h-full flex flex-col bg-white dark:bg-gray-800 shadow-sm relative z-10 transition-colors duration-200">
            <header className="bg-white dark:bg-gray-800 shadow-sm relative z-10 transition-colors duration-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="/logo_small.png" 
                    alt="Step Strong Logo" 
                    className="h-8 w-8 mr-3 dark:invert"
                  />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Step Strong</h1>
                </div>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 relative z-10">
              {children}
              <SpeedInsights />
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-200">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Step Strong <VersionDisplay />. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

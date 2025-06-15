"use client";
import React, { useEffect, useState } from 'react';

/**
 * PWAInstallPrompt - Shows an install button when the app is installable as a PWA.
 */
export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Utility to detect iOS Safari
  const isIOSSafari = () => {
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    return isIOS && isSafari;
  };

  useEffect(() => {
    // Detect if app is already installed (standalone mode)
    const checkStandalone = () => {
      const isInStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      setIsStandalone(isInStandalone);
    };
    checkStandalone();
    window.addEventListener('resize', checkStandalone);
    return () => {
      window.removeEventListener('resize', checkStandalone);
    };
  }, []);

  useEffect(() => {
    if (isStandalone) {
      setShowPrompt(false);
      setShowIOSGuide(false);
      return;
    }
    if (isIOSSafari()) {
      setShowIOSGuide(true);
      setShowPrompt(false);
      return;
    }
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
    // Optionally, you can log the outcome or show a message
  };

  if (isStandalone) return null;

  if (showIOSGuide) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-3 flex items-center gap-4 z-50 border border-gray-200 dark:border-gray-700">
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          To install this app on your iPhone or iPad, tap the <span role="img" aria-label="Share">&#x1f5d2;</span> Share button and select <b>Add to Home Screen</b> from the menu.
        </span>
      </div>
    );
  }

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-3 flex items-center gap-4 z-50 border border-gray-200 dark:border-gray-700">
      <span className="text-gray-900 dark:text-gray-100 font-medium">Install Step Strong on your device?</span>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
        onClick={handleInstallClick}
      >
        Install
      </button>
    </div>
  );
};

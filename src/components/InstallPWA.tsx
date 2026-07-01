import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Shows an "Install app" button only when the browser reports the site is
 * installable (fires beforeinstallprompt). Hidden once installed or unsupported.
 */
export function InstallPWA() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setPrompt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!prompt) return null;

  const install = async () => {
    await prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  return (
    <button
      onClick={install}
      title="Install this app"
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Install App</span>
    </button>
  );
}

export default InstallPWA;

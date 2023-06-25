/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const PwaInstall = () => {
  const [installPrompt, setInstallPrompt] = useState(null);

  // @ts-ignore
  const beforeInstallPromptHandler = (event) => {
    event.preventDefault();
    setInstallPrompt(event);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('preinstallation', beforeInstallPromptHandler);
    };
  }, []);

  if (!installPrompt) return null;

  return (
    <Button
      className="mt-20"
      variant="outlined"
      size="small"
      onClick={() => {
        // @ts-ignore
        installPrompt.prompt();
      }}
    >
      לחצו כאן להתקנה על מסך הבית
    </Button>
  );
};

export default PwaInstall;

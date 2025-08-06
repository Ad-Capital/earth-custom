import { useEffect } from 'react';

const PRELOADER_DURATION = 2000;

export const useLocomotiveScroll = (onLoadingComplete: () => void) => {
  useEffect(() => {
    const initializeScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      new LocomotiveScroll();

      setTimeout(() => {
        onLoadingComplete();
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, PRELOADER_DURATION);
    };

    initializeScroll();
  }, [onLoadingComplete]);
};
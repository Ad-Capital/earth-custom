import { useState, useCallback } from 'react';

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    completeLoading,
  };
};
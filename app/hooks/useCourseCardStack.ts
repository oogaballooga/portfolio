import { useState, useCallback } from 'react';
import { useCardZStack } from './useCardZStack';

interface CardProps {
  isActive: boolean;
  zIndex: number;
  onActivate: () => void;
  onDeactivate: () => void;
}

interface UseCourseCardStackReturn {
  activeCourseId: string | null;
  getCardProps: (id: string) => CardProps;
  deactivateAll: () => void;
}

export function useCourseCardStack(): UseCourseCardStackReturn {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const { activateCard, getZIndex } = useCardZStack(100);

  const deactivateAll = useCallback(() => {
    setActiveCourseId(null);
  }, []);

  const getCardProps = useCallback(
    (id: string): CardProps => {
      const isActive = activeCourseId === id;

      const activate = () => {
        if (isActive) {
          deactivateAll();
          return;
        }

        activateCard(id);
        setActiveCourseId(id);
      };

      return {
        isActive,
        zIndex: getZIndex(id),
        onActivate: activate,
        onDeactivate: deactivateAll,
      };
    },
    [activeCourseId, activateCard, getZIndex, deactivateAll]
  );

  return { activeCourseId, getCardProps, deactivateAll };
}
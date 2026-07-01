import { useState, useCallback } from 'react';

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
  const [currZIndex, setCurrZIndex] = useState(100);
  const [cardZ, setCardZ] = useState<Record<string, number>>({});

  const deactivateAll = useCallback(() => {
    setActiveCourseId(null);
  }, []);

  const getCardProps = useCallback(
    (id: string): CardProps => {
      const isActive = activeCourseId === id;

      // Use functional form to compute zIndex on activation without
      // needing activeCourseId or cardZ in the dependency closure.
      const activate = () => {
        if (isActive) {
          deactivateAll();
          return;
        }

        setCurrZIndex((prev) => {
          const next = prev + 1;
          setCardZ((z) => ({ ...z, [id]: next }));
          return next;
        });
        setActiveCourseId(id);
      };

      return {
        isActive,
        zIndex: cardZ[id] ?? 1,
        onActivate: activate,
        onDeactivate: deactivateAll,
      };
    },
    [activeCourseId, cardZ, deactivateAll]
  );

  return { activeCourseId, getCardProps, deactivateAll };
}
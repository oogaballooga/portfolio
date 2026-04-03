import { useState } from 'react';

interface UseCardStackReturn {
  activeCard: number | null;
  overlayZIndex: number;
  getCardProps: (id: number) => {
    isActive: boolean;
    zIndex: number;
    disabled: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
  };
  deactivate: () => void;
}

export function useCardStack(): UseCardStackReturn {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [currZIndex, setCurrZIndex] = useState(100);
  const [cardZ, setCardZ] = useState<Record<number, number>>({});

  const activate = (id: number) => {
    setCurrZIndex((prev) => {
      const next = prev + 1;
      setCardZ((z) => ({ ...z, [id]: next }));
      return next;
    });
    setActiveCard(id);
  };

  const deactivate = () => setActiveCard(null);

  const getCardProps = (id: number) => ({
    isActive: activeCard === id,
    zIndex: cardZ[id] ?? 1,
    disabled: activeCard !== null && activeCard !== id,
    onActivate: () => activate(id),
    onDeactivate: deactivate,
  });

  return {
    activeCard,
    overlayZIndex: currZIndex - 1,
    getCardProps,
    deactivate,
  };
}
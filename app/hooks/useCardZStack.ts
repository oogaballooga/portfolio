import { useState, useCallback } from 'react';

interface CardZState {
  counter: number;
  cardZ: Record<string, number>;
}

interface UseCardZStackReturn {
  activateCard: (id: string) => void;
  getZIndex: (id: string) => number;
}

export function useCardZStack(startAt = 1): UseCardZStackReturn {
  const [zState, setZState] = useState<CardZState>({
    counter: startAt,
    cardZ: {},
  });

  const activateCard = useCallback((id: string) => {
    setZState((prev) => {
      const next = prev.counter + 1;
      return { counter: next, cardZ: { ...prev.cardZ, [id]: next } };
    });
  }, []);

  const getZIndex = useCallback(
    (id: string) => zState.cardZ[id] ?? 1,
    [zState.cardZ]
  );

  return { activateCard, getZIndex };
}

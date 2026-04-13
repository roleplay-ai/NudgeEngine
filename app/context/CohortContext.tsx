'use client';

import { createContext, useContext, useState } from 'react';

interface CohortContextValue {
  activeCohortId: string | null;
  setActiveCohortId: (id: string | null) => void;
}

const CohortContext = createContext<CohortContextValue>({
  activeCohortId: null,
  setActiveCohortId: () => {},
});

export function CohortProvider({ children }: { children: React.ReactNode }) {
  const [activeCohortId, setActiveCohortId] = useState<string | null>(null);
  return (
    <CohortContext.Provider value={{ activeCohortId, setActiveCohortId }}>
      {children}
    </CohortContext.Provider>
  );
}

export function useCohort() {
  return useContext(CohortContext);
}

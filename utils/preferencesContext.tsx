import { createContext, useContext, useState, ReactNode } from 'react';

type UserPreferences = {
  selectedAllergens: string[];
  setSelectedAllergens: (allergens: string[]) => void;
  selectedRestrictions: string[];
  setSelectedRestrictions: (restrictions: string[]) => void;
};

const UserPreferencesContext = createContext<UserPreferences | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  return (
    <UserPreferencesContext.Provider value={{
      selectedAllergens,
      setSelectedAllergens,
      selectedRestrictions,
      setSelectedRestrictions
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}

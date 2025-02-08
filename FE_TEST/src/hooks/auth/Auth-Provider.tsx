// contexts/AuthContext.tsx
import { createContext, useContext } from "react";
import { useProfile } from "../../hooks/auth/useProfile";
import { UserData } from "../../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data,
        user: data || null,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("username")
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (username: string, password: string): Promise<boolean> => {
    // Validação básica
    if (!username || !password || username.includes(" ") || password.includes(" ")) {
      toast({
        title: "Erro de login",
        description: "Usuário e senha não podem estar vazios ou conter espaços",
        variant: "destructive",
      });
      return false;
    }

    // Simula login bem-sucedido (aceita qualquer entrada válida)
    setIsAuthenticated(true);
    setUser(username);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", username);
    navigate("/");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

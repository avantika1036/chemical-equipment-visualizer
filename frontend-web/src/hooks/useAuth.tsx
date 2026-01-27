import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login,
  register,
  logout,
  getStoredUser,
} from "@/lib/authService";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/* ===============================
   PROVIDER
================================ */

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --------------------
  // Load user on refresh
  // --------------------
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // --------------------
  // LOGIN
  // --------------------
  const signIn = async (
    email: string,
    password: string
  ) => {
    try {
      const data = await login(email, password);
      setUser({ email: data.email });
      return { error: null };
    } catch (err: any) {
      return {
        error:
          err?.response?.data ||
          { message: "Login failed" },
      };
    }
  };

  // --------------------
  // REGISTER
  // --------------------
  const signUp = async (
    email: string,
    password: string
  ) => {
    try {
      const data = await register(email, password);
      setUser({ email: data.email });
      return { error: null };
    } catch (err: any) {
      return {
        error:
          err?.response?.data ||
          { message: "Signup failed" },
      };
    }
  };

  // --------------------
  // LOGOUT
  // --------------------
  const signOut = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ===============================
   HOOK
================================ */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }
  return ctx;
};

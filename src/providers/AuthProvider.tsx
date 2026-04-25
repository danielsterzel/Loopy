import { useState, useEffect } from "react";

import type { User } from "../types/User";
import { getUser } from "../api/AuthApi";
import { AuthContext } from "../context/AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUser();

        setUser(data ?? null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, loading}}>
        {children}
    </AuthContext.Provider>
  )

}

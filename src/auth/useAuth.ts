import { useState, useEffect } from "react";
import { getUser } from "../api/AuthApi";

import type { User } from "../types/User";

export function useAuth() {
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

  return {user, loading, setUser};
}

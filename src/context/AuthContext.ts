import { createContext } from "react";

import type { User } from "../types/User";

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
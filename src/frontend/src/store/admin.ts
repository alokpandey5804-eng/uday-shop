import { create } from "zustand";

interface AdminStore {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

function loadToken(): string | null {
  try {
    return sessionStorage.getItem("uday_admin_token");
  } catch {
    return null;
  }
}

const initialToken = loadToken();

export const useAdminStore = create<AdminStore>((set) => ({
  token: initialToken,
  isAuthenticated: !!initialToken,

  login: (token: string) => {
    sessionStorage.setItem("uday_admin_token", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    sessionStorage.removeItem("uday_admin_token");
    set({ token: null, isAuthenticated: false });
  },
}));

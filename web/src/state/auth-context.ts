import { createContext } from "react";

export type User =
  | { kind: "staff"; id: string; email: string }
  | { kind: "customer"; id: string; email: string }
  | null;

export type AuthCtx = {
  user: User;
  loading: boolean;
  signInStaff: (p: { email: string; password: string }) => Promise<void>;
  signInCustomer: (p: { email: string; dob: string }) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>; // ← add this
};

export const AuthContext = createContext<AuthCtx | undefined>(undefined);

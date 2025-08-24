import { useEffect, useState } from "react";
import { AuthAPI } from "../state/auth-client";
import { AuthContext, type User } from "../state/auth-context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function hydrate() {
    try {
      const u = await AuthAPI.me();
      setUser(u);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void hydrate();
  }, []);

  async function signInStaff(p: { email: string; password: string }) {
    await AuthAPI.staffLogin(p);
    await hydrate();
  }

  async function signInCustomer(p: { email: string; dob: string }) {
    await AuthAPI.customerLogin(p);
    await hydrate();
  }

  async function signOut() {
    try {
      await AuthAPI.staffLogout();
    } catch {
      /* empty */
    }
    try {
      await AuthAPI.customerLogout();
    } catch {
      /* empty */
    }
    await hydrate();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInStaff,
        signInCustomer,
        signOut,
        refresh: hydrate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

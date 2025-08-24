// Small client for auth endpoints – no React here
const API: string = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

async function j<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "content-type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<T>;
}

export const AuthAPI = {
  staffLogin: (body: { email: string; password: string }) =>
    j<{ ok: true }>("/auth/staff/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  staffLogout: () => j<{ ok: true }>("/auth/staff/logout", { method: "POST" }),

  customerLogin: (body: { email: string; dob: string }) =>
    j<{ ok: true }>("/auth/customer/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  customerLogout: () =>
    j<{ ok: true }>("/auth/customer/logout", { method: "POST" }),

  me: async () => {
    const [staff, customer] = await Promise.all([
      j<{ user: { id: string; email: string } | null }>("/auth/staff/me"),
      j<{ user: { id: string; email: string } | null }>("/auth/customer/me"),
    ]);
    if (staff.user) return { kind: "staff" as const, ...staff.user };
    if (customer.user) return { kind: "customer" as const, ...customer.user };
    return null;
  },
};

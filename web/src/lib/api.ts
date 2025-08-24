const API = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export const AuthAPI = {
  staffLogin: (body: { email: string; password: string }) =>
    req<{ ok: true }>("/auth/staff/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  staffMe: () =>
    req<{ user: { id: string; email: string; role: string } | null }>(
      "/auth/staff/me"
    ),
  staffLogout: () =>
    req<{ ok: true }>("/auth/staff/logout", { method: "POST" }),

  customerLogin: (body: { email: string; dob: string }) =>
    req<{ ok: true }>("/auth/customer/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  customerMe: () =>
    req<{ user: { id: string; email: string } | null }>("/auth/customer/me"),
  customerLogout: () =>
    req<{ ok: true }>("/auth/customer/logout", { method: "POST" }),
};

export const StaffAPI = {
  listCases: (qs: string) =>
    req<{ rows: unknown[]; total: number; page: number; pageSize: number }>(
      `/staff/cases${qs}`
    ),
  getCase: (id: string) => req<unknown>(`/staff/cases/${id}`),
  addNote: (id: string, body: string) =>
    req(`/staff/cases/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),
  decide: (id: string, status: "approved" | "rejected", reason: string) =>
    req(`/staff/cases/${id}/decision`, {
      method: "POST",
      body: JSON.stringify({ status, reason }),
    }),
};

export const CustomerAPI = {
  myCases: () => req<unknown[]>("/customer/cases"),
  caseDetail: (id: string) => req<unknown>(`/customer/cases/${id}`),
};

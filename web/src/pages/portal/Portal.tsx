import { useEffect, useState } from "react";
import { useAuth } from "@/state/useAuth";

type CustomerCase = {
  id: string;
  status: string;
  submittedAt: string; // ISO
};

type CustomerDashboard = {
  recentCases: CustomerCase[];
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

export default function Portal() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<CustomerDashboard | null>(null);

  useEffect(() => {
    if (!user || user.kind !== "customer") return;
    (async () => {
      const res = await fetch(`${API}/customer/portal`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const payload: CustomerDashboard = await res.json();
      setData(payload);
    })().catch(console.error);
  }, [user]);

  if (loading) return <div className="container">Loading…</div>;
  if (!user || user.kind !== "customer") {
    return (
      <div className="container" style={{ padding: "24px 0" }}>
        Please sign in as a customer to view the portal.
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ marginTop: 0 }}>Welcome back, {user.email}</h2>

      <div className="card">
        <strong>Your applications</strong>
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          {data?.recentCases?.length ? (
            data.recentCases.map((c) => (
              <li key={c.id}>
                #{c.id} — {c.status} —{" "}
                {new Date(c.submittedAt).toLocaleString()}
              </li>
            ))
          ) : (
            <li style={{ opacity: 0.7 }}>No applications yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

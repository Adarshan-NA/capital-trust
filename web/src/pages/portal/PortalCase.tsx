import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/state/useAuth";

type RiskLevel = "low" | "medium" | "high";

type CustomerNote = {
  id: string;
  body: string;
  createdAt: string; // ISO
};

type CustomerCaseDetail = {
  id: string;
  status: string;
  submittedAt: string; // ISO
  documentType?: string | null;
  decisionReason?: string | null;
  risk?: { level: RiskLevel } | null;
  notes?: CustomerNote[];
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

export default function PortalCase() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const [data, setData] = useState<CustomerCaseDetail | null>(null);

  useEffect(() => {
    if (!user || user.kind !== "customer" || !id) return;
    (async () => {
      const res = await fetch(`${API}/customer/cases/${id}`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const payload: CustomerCaseDetail = await res.json();
      setData(payload);
    })().catch(console.error);
  }, [user, id]);

  if (loading) return <div className="container">Loading…</div>;
  if (!user || user.kind !== "customer") {
    return (
      <div className="container" style={{ padding: "24px 0" }}>
        Please sign in as a customer to view this case.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container" style={{ padding: "24px 0" }}>
        No case found.
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ padding: "24px 0", display: "grid", gap: 16 }}
    >
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Application #{data.id}</h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <strong>Status / Risk</strong>
            <div>
              {data.status} / {data.risk?.level ?? "—"}
            </div>
            <div>Submitted: {new Date(data.submittedAt).toLocaleString()}</div>
          </div>
          <div>
            <strong>Document type</strong>
            <div>{data.documentType ?? "—"}</div>
            <strong style={{ display: "block", marginTop: 8 }}>
              Decision reason
            </strong>
            <div>{data.decisionReason ?? "—"}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <strong>Notes</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          {data.notes?.length ? (
            data.notes.map((n) => (
              <li key={n.id}>
                <div>{n.body}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </li>
            ))
          ) : (
            <li style={{ opacity: 0.7 }}>No notes yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

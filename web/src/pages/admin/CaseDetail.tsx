import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/state/useAuth";
import { CaseFull } from "./types";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const [row, setRow] = useState<CaseFull | null>(null);
  const [noteBody, setNoteBody] = useState("");
  const [decision, setDecision] = useState<"approved" | "rejected">("approved");
  const [reason, setReason] = useState("");

  // Load detail
  useEffect(() => {
    if (!user || user.kind !== "staff" || !id) return;
    (async () => {
      const res = await fetch(`${API}/staff/cases/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to load case ${res.status}`);
      const data: CaseFull = await res.json();
      setRow(data);
    })().catch((e) => console.error(e));
  }, [user, id]);

  if (loading) return <div className="container">Loading…</div>;
  if (!user || user.kind !== "staff")
    return <div className="container">Unauthorized</div>;
  if (!row) return <div className="container">No case found.</div>;

  async function addNote() {
    if (!id || !noteBody.trim()) return;
    const res = await fetch(`${API}/staff/cases/${id}/notes`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ body: noteBody.trim() }),
    });
    if (!res.ok) return alert("Failed to add note");
    setNoteBody("");
    // refresh
    const r = await fetch(`${API}/staff/cases/${id}`, {
      credentials: "include",
    });
    const data: CaseFull = await r.json();
    setRow(data);
  }

  async function makeDecision() {
    if (!id || !reason.trim()) return;
    const res = await fetch(`${API}/staff/cases/${id}/decision`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: decision, reason }),
    });
    if (!res.ok) return alert("Failed to submit decision");
    // refresh
    const r = await fetch(`${API}/staff/cases/${id}`, {
      credentials: "include",
    });
    const data: CaseFull = await r.json();
    setRow(data);
    setReason("");
  }

  return (
    <div
      className="container"
      style={{ padding: "24px 0", display: "grid", gap: 16 }}
    >
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Case #{row.id}</h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <strong>Applicant</strong>
            <div>
              {row.customer.firstName} {row.customer.lastName} &middot;{" "}
              {row.customer.email}
            </div>
            <div>
              {row.customer.city}, {row.customer.province} {row.customer.postal}
            </div>
          </div>
          <div>
            <strong>Status / Risk</strong>
            <div>
              {row.status} / {row.risk?.level ?? "—"}
            </div>
            <div>Submitted: {new Date(row.submittedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <strong>Add note</strong>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            className="input"
            placeholder="Type a note…"
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={addNote}
            disabled={!noteBody.trim()}
          >
            Add
          </button>
        </div>
      </div>

      <div className="card">
        <strong>Decision</strong>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <select
            className="input"
            value={decision}
            onChange={(e) =>
              setDecision(e.target.value as "approved" | "rejected")
            }
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <input
            className="input"
            placeholder="Reason (required)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={makeDecision}
            disabled={!reason.trim()}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="card">
        <strong>Notes</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          {row.notes.map((n) => (
            <li key={n.id}>
              <div style={{ fontWeight: 600 }}>{n.author.email}</div>
              <div>{n.body}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
          {row.notes.length === 0 && (
            <li style={{ opacity: 0.7 }}>No notes.</li>
          )}
        </ul>
      </div>

      <div className="card">
        <strong>Audit log (latest)</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          {row.audits.map((a) => (
            <li key={a.id}>
              <div>
                <b>{a.event}</b> &middot;{" "}
                {new Date(a.createdAt).toLocaleString()}
              </div>
              <pre
                style={{
                  margin: "4px 0 0",
                  background: "var(--ct-mist)",
                  padding: 8,
                  borderRadius: 6,
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(a.data ?? {}, null, 2)}
              </pre>
            </li>
          ))}
          {row.audits.length === 0 && (
            <li style={{ opacity: 0.7 }}>No audit entries.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

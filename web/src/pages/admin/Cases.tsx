import { useEffect, useState } from "react";
import { useAuth } from "@/state/useAuth";
import { CaseRow, ListResponse } from "./types";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3020";

export default function AdminCases() {
  const { user, loading } = useAuth();
  const [rows, setRows] = useState<CaseRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!user || user.kind !== "staff") return;

    (async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        sortBy: "submittedAt",
        sortDir: "desc",
      });

      const res = await fetch(`${API}/staff/cases?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to load cases:", res.status);
        return;
      }
      const data: ListResponse = await res.json(); // ← type the payload
      setRows(data.rows);
      setTotal(data.total);
    })().catch((e) => console.error(e));
  }, [user, page]);

  if (loading) return <div className="container">Loading…</div>;
  if (!user || user.kind !== "staff")
    return <div className="container">Unauthorized</div>;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ marginTop: 0 }}>Applications</h2>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Location</th>
              <th>Status</th>
              <th>Risk</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.customer.firstName} {r.customer.lastName}
                </td>
                <td>{r.customer.email}</td>
                <td>
                  {r.customer.city}, {r.customer.province} {r.customer.postal}
                </td>
                <td>{r.status}</td>
                <td>{r.risk?.level ?? "—"}</td>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", opacity: 0.7 }}>
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          className="btn btn-ghost"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <div style={{ alignSelf: "center" }}>
          Page {page} of {totalPages}
        </div>
        <button
          className="btn btn-ghost"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

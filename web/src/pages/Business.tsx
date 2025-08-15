export default function Business() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Business banking</h1>
      <p style={{ color: "var(--ct-slate)" }}>
        Accounts and services for SMBs and sole proprietors.
      </p>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          marginTop: 16,
        }}
      >
        <div className="card">
          <strong>Business Chequing</strong>
          <p>Tiered-fee structure with free e-Deposits.</p>
          <a href="/open-account">Open now →</a>
        </div>
        <div className="card">
          <strong>Payments</strong>
          <p>Accept cards and Interac with simple pricing.</p>
          <a href="/support">Talk to us →</a>
        </div>
        <div className="card">
          <strong>Credit</strong>
          <p>Lines of credit with transparent terms.</p>
          <a href="/support">Get details →</a>
        </div>
      </div>
    </div>
  );
}

export default function Business() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h2 style={{ marginTop: 0 }}>Business banking</h2>
      <p style={{ color: "var(--ct-slate)", marginBottom: 20 }}>
        Accounts, payments, and cash management designed for growth.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <div className="card">
          <strong>Business Operating</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Tiered pricing; unlimited e-Transfers; accountant access.
          </p>
          <a href="/open-account">Open now →</a>
        </div>

        <div className="card">
          <strong>USD Holding</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Keep and pay in USD with competitive FX and no monthly fee.
          </p>
          <a href="/open-account">Open now →</a>
        </div>

        <div className="card">
          <strong>Payment APIs</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Automate payouts and reconciliations via secure APIs.
          </p>
          <a href="/support">Talk to sales →</a>
        </div>
      </div>
    </div>
  );
}

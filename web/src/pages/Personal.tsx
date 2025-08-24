export default function Personal() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h2 style={{ marginTop: 0 }}>Personal banking</h2>
      <p style={{ color: "var(--ct-slate)", marginBottom: 20 }}>
        Everyday accounts, savings, and credit—built to be transparent.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <div className="card">
          <strong>Capital Chequing</strong>
          <p style={{ margin: "8px 0 12px" }}>
            No monthly fee when you keep a minimum balance.
          </p>
          <a href="/open-account">Open chequing →</a>
        </div>

        <div className="card">
          <strong>High-Interest Savings</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Earn a promotional rate for the first 3 months.
          </p>
          <a href="/open-account">Open savings →</a>
        </div>

        <div className="card">
          <strong>Cashback Credit</strong>
          <p style={{ margin: "8px 0 12px" }}>
            1.5% back on everyday purchases.
          </p>
          <a href="/open-account">Apply now →</a>
        </div>
      </div>
    </div>
  );
}

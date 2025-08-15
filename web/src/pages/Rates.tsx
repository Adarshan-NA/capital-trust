export default function Rates() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Rates</h1>
      <p style={{ color: "var(--ct-slate)" }}>
        Posted rates (subject to change). Promotional rates may apply.
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
          <strong>High-Interest Savings</strong>
          <p>
            <span className="badge">Promo</span> 4.25% for first 3 months
          </p>
        </div>
        <div className="card">
          <strong>GIC</strong>
          <p>1-Year: 4.10% · 3-Year: 3.65%</p>
        </div>
        <div className="card">
          <strong>Chequing</strong>
          <p>No monthly fee with minimum balance</p>
        </div>
      </div>
    </div>
  );
}

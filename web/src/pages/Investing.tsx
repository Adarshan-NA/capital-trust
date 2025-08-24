export default function Investing() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h2 style={{ marginTop: 0 }}>Investing</h2>
      <p style={{ color: "var(--ct-slate)", marginBottom: 20 }}>
        Simple, diversified portfolios and tax-advantaged accounts.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <div className="card">
          <strong>TFSA</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Grow investments tax-free; withdraw anytime.
          </p>
          <a href="/open-account">Open TFSA →</a>
        </div>

        <div className="card">
          <strong>RRSP</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Contribute pre-tax income and defer taxes to retirement.
          </p>
          <a href="/open-account">Open RRSP →</a>
        </div>

        <div className="card">
          <strong>Managed portfolios</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Professionally built ETF portfolios with low fees.
          </p>
          <a href="/support">Learn more →</a>
        </div>
      </div>
    </div>
  );
}

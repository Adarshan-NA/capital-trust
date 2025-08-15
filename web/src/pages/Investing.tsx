export default function Investing() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Investing</h1>
      <p style={{ color: "var(--ct-slate)" }}>
        Simple, tax-efficient options for long-term goals.
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
          <strong>GICs</strong>
          <p>Guaranteed returns. Ladder strategies available.</p>
          <a href="/rates">See rates →</a>
        </div>
        <div className="card">
          <strong>TFSA</strong>
          <p>Grow savings tax-free with flexible withdrawals.</p>
          <a href="/open-account">Open TFSA →</a>
        </div>
        <div className="card">
          <strong>RRSP</strong>
          <p>Save for retirement with tax-deferred growth.</p>
          <a href="/open-account">Open RRSP →</a>
        </div>
      </div>
    </div>
  );
}

export default function Personal() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Personal banking</h1>
      <p style={{ color: "var(--ct-slate)" }}>
        Everyday accounts built around clarity and value.
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
          <strong>Capital Chequing</strong>
          <p>
            No monthly fee with a minimum balance. Interac e-Transfers included.
          </p>
          <a href="/open-account">Open now →</a>
        </div>
        <div className="card">
          <strong>High-Interest Savings</strong>
          <p>Earn a promotional rate for the first 3 months. No minimums.</p>
          <a href="/open-account">Start saving →</a>
        </div>
        <div className="card">
          <strong>Cashback Credit</strong>
          <p>1.5% back on everyday purchases. No annual fee.</p>
          <a href="/open-account">Apply →</a>
        </div>
      </div>
    </div>
  );
}

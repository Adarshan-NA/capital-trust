export default function Personal() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <section className="hero-slim">
        <h1>Personal banking</h1>
        <p className="muted">
          Everyday chequing, savings, and cards—simple, transparent,
          digital-first.
        </p>
      </section>

      <div className="grid-3">
        <article className="card">
          <h3>Capital Chequing</h3>
          <p className="muted">
            No monthly fee with minimum balance, free Interac e-Transfers®.
          </p>
          <a className="btn" href="/open-account">
            Open an account →
          </a>
        </article>
        <article className="card">
          <h3>High-Interest Savings</h3>
          <p className="muted">
            Earn a promotional rate for the first 3 months. No minimums.
          </p>
          <a className="btn" href="/open-account">
            Start saving →
          </a>
        </article>
        <article className="card">
          <h3>Cashback Credit</h3>
          <p className="muted">
            1.5% back on everyday purchases, no foreign transaction fees.
          </p>
          <a className="btn" href="/open-account">
            Get the card →
          </a>
        </article>
      </div>
    </div>
  );
}

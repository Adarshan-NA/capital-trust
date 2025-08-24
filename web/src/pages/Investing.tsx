export default function Investing() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <section className="hero-slim">
        <h1>Investing</h1>
        <p className="muted">
          Self-directed trading with low fees and registered accounts.
        </p>
      </section>

      <div className="grid-3">
        <article className="card">
          <h3>TFSA</h3>
          <p className="muted">
            Grow your investments tax-free. No annual account fee.
          </p>
          <a className="btn" href="/open-account">
            Open TFSA →
          </a>
        </article>
        <article className="card">
          <h3>RRSP</h3>
          <p className="muted">
            Save for retirement and reduce taxable income.
          </p>
          <a className="btn" href="/open-account">
            Open RRSP →
          </a>
        </article>
        <article className="card">
          <h3>Non-registered</h3>
          <p className="muted">
            Trade stocks and ETFs with transparent pricing.
          </p>
          <a className="btn" href="/open-account">
            Open account →
          </a>
        </article>
      </div>
    </div>
  );
}

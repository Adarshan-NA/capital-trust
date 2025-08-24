export default function Business() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <section className="hero-slim">
        <h1>Business banking</h1>
        <p className="muted">
          Accounts, payments, and cash management designed for growth.
        </p>
      </section>

      <div className="grid-3">
        <article className="card">
          <h3>Business Operating</h3>
          <p className="muted">
            Tiered pricing; unlimited e-Transfers; accountant access.
          </p>
          <a className="btn" href="/open-account">
            Open now →
          </a>
        </article>
        <article className="card">
          <h3>USD Holding</h3>
          <p className="muted">
            Keep and pay in USD with competitive FX and no monthly fee.
          </p>
          <a className="btn" href="/open-account">
            Open now →
          </a>
        </article>
        <article className="card">
          <h3>Payment APIs</h3>
          <p className="muted">
            Automate payouts and reconciliations via secure APIs.
          </p>
          <a className="btn" href="/support">
            Talk to sales →
          </a>
        </article>
      </div>
    </div>
  );
}

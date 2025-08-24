export default function Support() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <section className="hero-slim">
        <h1>Support</h1>
        <p className="muted">
          We’re here 24/7. Choose the option that works for you.
        </p>
      </section>

      <div className="grid-3">
        <article className="card">
          <h3>Call us</h3>
          <p className="muted">
            1-800-000-0000
            <br />
            Mon–Sun, 24 hours
          </p>
        </article>
        <article className="card">
          <h3>Secure message</h3>
          <p className="muted">Sign in and send us a secure message.</p>
          <a className="btn" href="/signin">
            Sign in →
          </a>
        </article>
        <article className="card">
          <h3>Visit a branch</h3>
          <p className="muted">Find the nearest branch and hours.</p>
          <a className="btn" href="#">
            Find a branch →
          </a>
        </article>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Report fraud</h2>
        <p>
          If you suspect fraud, call us immediately and change your passwords.
        </p>
      </section>
    </div>
  );
}

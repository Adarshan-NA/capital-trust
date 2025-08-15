export default function Support() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ fontFamily: "var(--font-serif)" }}>Support</h1>
      <p style={{ color: "var(--ct-slate)" }}>
        We’re here to help—24/7 for fraud, extended hours for everyday banking.
      </p>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "2fr 1fr",
          alignItems: "start",
        }}
      >
        <div className="card">
          <strong>FAQs</strong>
          <details>
            <summary>How do I open an account?</summary>
            <p>
              Use the <a href="/open-account">Open an account</a> flow and
              follow the steps.
            </p>
          </details>
          <details>
            <summary>How do I report fraud?</summary>
            <p>Call us immediately; we’ll lock accounts and investigate.</p>
          </details>
          <details>
            <summary>What documents are accepted?</summary>
            <p>Driver’s license, passport, or issued photo ID.</p>
          </details>
        </div>
        <div className="card">
          <strong>Contact</strong>
          <p>Phone: 1-800-000-0000</p>
          <p>Chat: Available 8am–10pm ET</p>
          <a className="btn btn-primary" href="/open-account">
            Open an account
          </a>
        </div>
      </div>
    </div>
  );
}

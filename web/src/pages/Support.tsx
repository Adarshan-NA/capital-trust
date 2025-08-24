export default function Support() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h2 style={{ marginTop: 0 }}>Support</h2>
      <p style={{ color: "var(--ct-slate)", marginBottom: 20 }}>
        We’re here 24/7. Choose the channel that works best for you.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <div className="card">
          <strong>Chat</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Get quick answers from our support team.
          </p>
          <a href="#">Start chat →</a>
        </div>

        <div className="card">
          <strong>Email</strong>
          <p style={{ margin: "8px 0 12px" }}>
            We usually respond within a business day.
          </p>
          <a href="mailto:support@capitaltrust.example">Email us →</a>
        </div>

        <div className="card">
          <strong>Security & fraud</strong>
          <p style={{ margin: "8px 0 12px" }}>
            Report suspicious activity and learn best practices.
          </p>
          <a href="/support/security">View tips →</a>
        </div>
      </div>
    </div>
  );
}

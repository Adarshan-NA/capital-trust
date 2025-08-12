export default function Footer() {
  return (
    <footer className="footer">
      <div
        className="container"
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        <div>
          <h4 style={{ marginTop: 0, color: "#e2e8f0" }}>Capital Trust</h4>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            Banking that works as hard as you do.
          </p>
        </div>
        <div>
          <strong>Banking</strong>
          <ul>
            <li>
              <a href="/personal">Personal</a>
            </li>
            <li>
              <a href="/business">Business</a>
            </li>
            <li>
              <a href="/investing">Investing</a>
            </li>
          </ul>
        </div>
        <div>
          <strong>Resources</strong>
          <ul>
            <li>
              <a href="/rates">Rates</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
            <li>
              <a href="/open-account">Open an account</a>
            </li>
          </ul>
        </div>
        <div>
          <strong>Legal</strong>
          <ul>
            <li>Security</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div
        className="container"
        style={{ marginTop: 16, fontSize: "0.85rem", color: "#93a3b8" }}
      >
        © {new Date().getFullYear()} Capital Trust. All rights reserved.
      </div>
    </footer>
  );
}

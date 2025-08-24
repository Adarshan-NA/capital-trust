export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            src="/CapitalTrustLogoInverse.svg"
            alt="Capital Trust"
            width={160}
            height={32}
          />
          <p className="muted" style={{ marginTop: 8 }}>
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
            <li>
              <a href="/rates">Rates</a>
            </li>
          </ul>
        </div>

        <div>
          <strong>Support</strong>
          <ul>
            <li>
              <a href="/support">Contact us</a>
            </li>
            <li>
              <a href="/support">Security</a>
            </li>
            <li>
              <a href="/support">Accessibility</a>
            </li>
          </ul>
        </div>

        <div>
          <strong>Legal</strong>
          <ul>
            <li>
              <a href="/support">Privacy</a>
            </li>
            <li>
              <a href="/support">Terms</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} Capital Trust. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

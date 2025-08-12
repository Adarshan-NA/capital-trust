export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Left */}
          <div>
            <div className="badge" aria-hidden>
              New to Capital Trust
            </div>
            <h1
              style={{
                fontSize: "var(--fs-900)",
                margin: "12px 0 8px",
                fontFamily: "var(--font-serif)",
              }}
            >
              Banking that works as hard as you do.
            </h1>
            <p
              style={{
                fontSize: "var(--fs-500)",
                color: "var(--ct-slate)",
                marginBottom: 20,
              }}
            >
              Open an account in minutes. No branch visit, no surprises.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a className="btn btn-primary" href="/open-account">
                Open an account
              </a>
              <a className="btn btn-ghost" href="/personal">
                Explore accounts
              </a>
            </div>
          </div>

          {/* Right: product stack */}
          <div className="panel-muted">
            <div className="product-stack">
              <div className="card product-card">
                {ChequingIcon()}
                <div>
                  <strong>Capital Chequing</strong>
                  <p style={{ margin: "6px 0", color: "var(--ct-slate)" }}>
                    No monthly fee when you keep a minimum balance.
                  </p>
                  <a href="/personal">Learn more →</a>
                </div>
              </div>

              <div className="card product-card">
                {SavingsIcon()}
                <div>
                  <strong>High-Interest Savings</strong>
                  <p style={{ margin: "6px 0", color: "var(--ct-slate)" }}>
                    Earn a promotional rate for the first 3 months.
                  </p>
                  <a href="/personal">Learn more →</a>
                </div>
              </div>

              <div className="card product-card">
                {CardIcon()}
                <div>
                  <strong>Cashback Credit</strong>
                  <p style={{ margin: "6px 0", color: "var(--ct-slate)" }}>
                    1.5% back on everyday purchases.
                  </p>
                  <a href="/personal">Learn more →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP (dark band) */}
      <section className="trust-strip">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr 1fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          <img
            src="/CapitalTrustLogoInverse.svg"
            alt="Capital Trust"
            width={180}
            height={36}
          />
          <div>
            <strong>Protected & transparent</strong>
            <div style={{ opacity: 0.85 }}>
              Clear fraud protections and strong encryption.
            </div>
          </div>
          <div>
            <strong>Here when you need us</strong>
            <div style={{ opacity: 0.85 }}>
              24/7 support and easy self-serve tools.
            </div>
          </div>
        </div>
      </section>

      {/* PROMO BAND (accent) */}
      <section className="promo-band">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ fontSize: "1.25rem" }}>
              Student bundle: no monthly fees for 12 months
            </strong>
            <div style={{ opacity: 0.9 }}>
              Plus a $100 welcome bonus when you set up direct deposit.
            </div>
          </div>
          <a className="btn" href="/open-account">
            Get started
          </a>
        </div>
      </section>

      {/* SECURITY PANEL */}
      <section className="container" style={{ padding: "40px 0" }}>
        <div className="card">
          <strong>Security you can trust</strong>
          <p style={{ margin: "8px 0 0", color: "var(--ct-slate)" }}>
            Advanced encryption, proactive monitoring, and clear fraud
            protections.
          </p>
        </div>
      </section>
    </>
  );
}

function ChequingIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      role="img"
      aria-label="Chequing"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1FBF72" />
          <stop offset="1" stopColor="#0B2D4D" />
        </linearGradient>
      </defs>
      <rect rx="12" width="56" height="56" fill="url(#g1)" />
      <rect
        x="10"
        y="20"
        width="36"
        height="16"
        rx="4"
        fill="white"
        opacity="0.95"
      />
      <rect x="14" y="24" width="16" height="4" rx="2" fill="#0B2D4D" />
      <rect x="14" y="30" width="8" height="4" rx="2" fill="#1FBF72" />
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      role="img"
      aria-label="Savings"
    >
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0B2D4D" />
          <stop offset="1" stopColor="#1FBF72" />
        </linearGradient>
      </defs>
      <rect rx="12" width="56" height="56" fill="url(#g2)" />
      <circle cx="28" cy="28" r="12" fill="#fff" opacity="0.95" />
      <text
        x="28"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#0B2D4D"
      >
        $
      </text>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      role="img"
      aria-label="Credit Card"
    >
      <rect rx="12" width="56" height="56" fill="#0B2D4D" />
      <rect
        x="10"
        y="20"
        width="36"
        height="20"
        rx="6"
        fill="#1FBF72"
        opacity="0.85"
      />
      <rect x="14" y="26" width="12" height="4" rx="2" fill="#0B2D4D" />
      <rect x="14" y="32" width="20" height="4" rx="2" fill="#0B2D4D" />
    </svg>
  );
}

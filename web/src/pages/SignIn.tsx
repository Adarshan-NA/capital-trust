export default function SignIn() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className="card" style={{ maxWidth: 420 }}>
        <h2 style={{ marginTop: 0 }}>Online Banking</h2>
        <p style={{ color: "var(--ct-slate)" }}>
          Sign-in is disabled in this demo.
        </p>
        <a className="btn btn-primary" href="/open-account">
          Open an account
        </a>
      </div>
    </div>
  );
}

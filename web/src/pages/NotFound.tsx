export default function NotFound() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Page not found</h1>
        <p className="muted">We couldn’t find that page.</p>
        <a className="btn" href="/">
          Go home
        </a>
      </div>
    </div>
  );
}

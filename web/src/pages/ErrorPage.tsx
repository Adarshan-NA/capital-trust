import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  const message = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : "Something went wrong";
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Error</h1>
        <p className="muted">{message}</p>
        <a className="btn" href="/">
          Back to home
        </a>
      </div>
    </div>
  );
}

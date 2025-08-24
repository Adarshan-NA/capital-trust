import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../lib/api";
import { useAuth } from "../state/useAuth";

export default function SignIn() {
  const [tab, setTab] = useState<"staff" | "customer">("staff");
  return (
    <div className="container" style={{ padding: "32px 0", maxWidth: 720 }}>
      <section className="hero-slim">
        <h1>Sign in</h1>
        <p className="muted">Choose Staff or Customer to continue.</p>
      </section>

      <div className="tabs" role="tablist" aria-label="Sign in type">
        <button
          role="tab"
          aria-selected={tab === "staff"}
          className={`tab ${tab === "staff" ? "active" : ""}`}
          onClick={() => setTab("staff")}
        >
          Staff
        </button>
        <button
          role="tab"
          aria-selected={tab === "customer"}
          className={`tab ${tab === "customer" ? "active" : ""}`}
          onClick={() => setTab("customer")}
        >
          Customer
        </button>
      </div>

      {tab === "staff" ? <StaffForm /> : <CustomerForm />}
    </div>
  );
}

function StaffForm() {
  const nav = useNavigate();
  const { refresh } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await AuthAPI.staffLogin({
        email: String(fd.get("email")),
        password: String(fd.get("password")),
      });
      await refresh();
      nav("/admin/cases");
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <form className="card" style={{ marginTop: 16 }} onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0 }}>Staff sign in</h2>
      {error && (
        <div className="panel-warning" role="alert">
          {error}
        </div>
      )}
      <label className="stack">
        <span>Email</span>
        <input
          type="email"
          name="email"
          defaultValue="adarshan@rbc.ca"
          required
        />
      </label>
      <label className="stack">
        <span>Password</span>
        <input
          type="password"
          name="password"
          defaultValue="adarshan"
          required
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
}

function CustomerForm() {
  const nav = useNavigate();
  const { refresh } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await AuthAPI.customerLogin({
        email: String(fd.get("email")),
        dob: String(fd.get("dob")),
      });
      await refresh();
      nav("/portal");
    } catch {
      setError("Invalid email or date of birth");
    }
  }

  return (
    <form className="card" style={{ marginTop: 16 }} onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0 }}>Customer sign in</h2>
      {error && (
        <div className="panel-warning" role="alert">
          {error}
        </div>
      )}
      <label className="stack">
        <span>Email</span>
        <input type="email" name="email" required />
      </label>
      <label className="stack">
        <span>Date of birth</span>
        <input type="date" name="dob" required />
      </label>
      <button className="btn btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
}

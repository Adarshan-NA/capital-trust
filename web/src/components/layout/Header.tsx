import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Capital Trust home">
          <img src="/CapitalTrustLogo.svg" alt="" width={200} height={128} />
          {/* <span>Capital Trust</span> */}
        </NavLink>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>☰
        </button>

        <nav
          id="primary-nav"
          className={`nav ${open ? "open" : ""}`}
          aria-label="Primary"
        >
          <NavLink
            to="/personal"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Personal
          </NavLink>
          <NavLink
            to="/business"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Business
          </NavLink>
          <NavLink
            to="/investing"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Investing
          </NavLink>
          <NavLink
            to="/rates"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Rates
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Support
          </NavLink>

          <div className="nav-cta">
            <NavLink to="/signin" className="btn btn-ghost">
              Sign in
            </NavLink>
            <NavLink to="/open-account" className="btn btn-primary">
              Open account
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

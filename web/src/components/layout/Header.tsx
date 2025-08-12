import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container navbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" aria-label="Capital Trust home">
            <img
              src="/CapitalTrustLogo.svg"
              alt=""
              width={180}
              height={36}
              style={{ display: "block" }}
            />
          </a>
        </div>

        <nav
          className="navlinks"
          style={{ display: "flex", gap: 8, marginLeft: "auto" }}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/personal">Personal</NavLink>
          <NavLink to="/business">Business</NavLink>
          <NavLink to="/investing">Investing</NavLink>
          <NavLink to="/rates">Rates</NavLink>
          <NavLink to="/support">Support</NavLink>
        </nav>
        <div style={{ display: "flex", gap: 10 }}>
          <NavLink to="/sign-in" className="btn btn-ghost">
            Sign in
          </NavLink>
          <NavLink to="/open-account" className="btn btn-primary">
            Open an account
          </NavLink>
        </div>
      </div>
    </header>
  );
}

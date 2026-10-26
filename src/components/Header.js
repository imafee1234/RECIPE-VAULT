import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(term.trim())}`);
  };
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="Recipe Vault home"><span className="brand-mark">♨</span><span>Recipe<em>Vault</em></span></Link>
      <form className="header-search" onSubmit={submit} role="search">
        <input aria-label="Search recipes" placeholder="Find your next favourite..." value={term} onChange={e=>setTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/search">Explore</NavLink>
        <NavLink to="/dashboard">My Vault</NavLink>
        <NavLink to="/add-recipe">＋ Add recipe</NavLink>
      </nav>
    </div>
  </header>;
}

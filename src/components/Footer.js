import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
 return <footer className="site-footer"><div className="footer-inner"><span>© {new Date().getFullYear()} RecipeVault · Made for the love of good food.</span><div className="footer-links"><Link to="/">Home</Link><Link to="/search">Explore recipes</Link><Link to="/dashboard">My vault</Link></div></div></footer>;
}

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { getRecipes, getFavorites, saveFavorites } from "../data/recipes";

export default function RecipeSearchPage({ refreshKey }) {
 const location=useLocation(), navigate=useNavigate();
 const params=new URLSearchParams(location.search);
 const [term,setTerm]=useState(params.get("keyword")||"");
 const [category,setCategory]=useState("All categories");
 const [favoriteVersion,setFavoriteVersion]=useState(0);
 const recipes=getRecipes();
 useEffect(()=>setTerm(new URLSearchParams(location.search).get("keyword")||""),[location.search]);
 const results=recipes.filter(r=>(r.title||r.name||"").toLowerCase().includes(term.trim().toLowerCase()) && (category==="All categories"||r.category===category));
 const toggleFavorite=id=>{const ids=getFavorites();saveFavorites(ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]);setFavoriteVersion(v=>v+1);};
 void favoriteVersion;
 return <div><Header/><main className="page-wrap"><div className="search-heading"><span className="eyebrow">BROWSE THE COLLECTION</span><h1>Find your next favourite.</h1><p>Search by dish name or explore by category.</p></div>
  <form className="search-controls" onSubmit={e=>{e.preventDefault();navigate(`/search?keyword=${encodeURIComponent(term.trim())}`);}}><input className="search-input" aria-label="Search recipes" placeholder="Try “jollof”, “pasta”, “cake”..." value={term} onChange={e=>setTerm(e.target.value)}/><select className="filter-select" aria-label="Filter by category" value={category} onChange={e=>setCategory(e.target.value)}><option>All categories</option>{[...new Set(recipes.map(r=>r.category).filter(Boolean))].sort().map(c=><option key={c}>{c}</option>)}</select><button className="button button-primary">Search</button></form>
  <div className="section-head"><div><h2>{results.length} {results.length===1?"recipe":"recipes"} found</h2><p>{term?`Showing matches for “${term}”`:"Browse all available recipes."}</p></div></div>
  {results.length?<div className="recipe-grid">{results.map(r=><RecipeCard key={r.id} recipe={r} favorite={getFavorites().includes(r.id)} onToggleFavorite={toggleFavorite}/>)}</div>:<div className="empty-state"><h3>No recipes found just yet.</h3><p>Try a different search or add this recipe to your own vault.</p><Link className="button button-primary" to="/add-recipe">＋ Add a recipe</Link></div>}
 </main><Footer/></div>;
}

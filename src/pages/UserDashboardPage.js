import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { getRecipes, saveRecipes, getFavorites, saveFavorites } from "../data/recipes";

export default function UserDashboardPage({ refreshKey, refreshRecipes }) {
 const [version,setVersion]=useState(0);
 const recipes=getRecipes();
 const favorites=getFavorites();
 const favoriteRecipes=recipes.filter(r=>favorites.includes(r.id));
 const removeRecipe=id=>{if(!window.confirm("Delete this recipe from your vault? This cannot be undone."))return;saveRecipes(recipes.filter(r=>r.id!==id));saveFavorites(favorites.filter(x=>x!==id));setVersion(v=>v+1);refreshRecipes?.();};
 const toggleFavorite=id=>{saveFavorites(favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id]);setVersion(v=>v+1);};
 return <div><Header/><main className="page-wrap">
  <div className="dashboard-top"><div><span className="eyebrow">YOUR PERSONAL COLLECTION</span><h1 style={{marginTop:9}}>My Recipe Vault</h1><p>Everything you love to cook, gathered in one place.</p></div><Link className="button button-primary" to="/add-recipe">＋ Add recipe</Link></div>
  <div className="stats-grid"><div className="stat-card"><span>Total recipes</span><strong>{recipes.length}</strong></div><div className="stat-card"><span>Saved favourites</span><strong>{favoriteRecipes.length}</strong></div><div className="stat-card"><span>Categories</span><strong>{new Set(recipes.map(r=>r.category).filter(Boolean)).size}</strong></div></div>
  <section><div className="section-head"><div><span className="eyebrow">YOUR COLLECTION</span><h2>My recipes</h2><p>Your own kitchen ideas and go-to meals.</p></div></div>
   {recipes.length?<div className="recipe-grid">{recipes.map(r=><RecipeCard key={r.id} recipe={r} favorite={favorites.includes(r.id)} onToggleFavorite={toggleFavorite} onDelete={removeRecipe}/>)}</div>:<div className="empty-state"><h3>Your vault is ready for its first recipe.</h3><p>Add a recipe you love and it will appear here.</p><Link className="button button-primary" to="/add-recipe">Add your first recipe</Link></div>}
  </section>
  <section className="dashboard-section"><div className="section-head"><div><span className="eyebrow">SAVED FOR LATER</span><h2>Favourite recipes</h2><p>The dishes you want to find again.</p></div></div>
   {favoriteRecipes.length?<div className="recipe-grid">{favoriteRecipes.map(r=><RecipeCard key={r.id} recipe={r} favorite onToggleFavorite={toggleFavorite}/>)}</div>:<div className="empty-state"><h3>No favourites saved yet.</h3><p>Tap the heart on a recipe card to keep it close.</p><Link className="button button-secondary" to="/search">Explore recipes</Link></div>}
  </section>
 </main><Footer/></div>;
}

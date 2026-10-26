import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { getRecipes, getFavorites, saveFavorites } from "../data/recipes";

export default function HomePage({ refreshKey }) {
 const recipes = useMemo(()=>getRecipes(),[refreshKey]);
 const [favoriteVersion, setFavoriteVersion] = React.useState(0);
 const featured = recipes.slice(0,3); void favoriteVersion;
 return <div><Header/><main className="page-wrap">
  <section className="hero">
   <div className="hero-copy"><span className="eyebrow">YOUR LITTLE CORNER OF FLAVOUR</span><h1>Good food.<br/><span style={{color:"var(--green)"}}>Beautifully</span> gathered.</h1><p>Keep the recipes you love in one thoughtful place. Find fresh inspiration, save family favourites, and make something delicious today.</p><div className="hero-actions"><Link className="button button-primary" to="/search">Explore recipes ↗</Link><Link className="button button-secondary" to="/add-recipe">＋ Add your own</Link></div></div>
   <div className="hero-visual"><img className="hero-photo" src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1300&q=90" alt="A colourful table of fresh food"/><div className="hero-note"><strong>A little inspiration, daily</strong><span>Recipes worth coming back to.</span></div></div>
  </section>
  <section><div className="section-head"><div><span className="eyebrow">FRESH FROM THE VAULT</span><h2>Something delicious</h2><p>Ideas for your next meal, all in one place.</p></div><Link className="text-link" to="/search">See all recipes →</Link></div>
   {featured.length?<div className="recipe-grid">{featured.map(recipe=><RecipeCard key={recipe.id} recipe={recipe} favorite={getFavorites().includes(recipe.id)} onToggleFavorite={id=>{const ids=getFavorites();saveFavorites(ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]);setFavoriteVersion(v=>v+1);}}/>)}</div>:<div className="empty-state"><h3>Your recipe collection starts here.</h3><Link className="button button-primary" to="/add-recipe">Add a recipe</Link></div>}
  </section>
  <section style={{marginTop:48,background:"var(--lime)",borderRadius:22,padding:"clamp(24px,5vw,42px)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}><div><span className="eyebrow">MAKE IT YOURS</span><h2 style={{marginTop:8,marginBottom:8}}>Your recipes, your story.</h2><p style={{margin:0}}>Save the dishes you make on repeat and build a vault of your own.</p></div><Link className="button button-primary" to="/dashboard">Open my vault ↗</Link></section>
 </main><Footer/></div>;
}

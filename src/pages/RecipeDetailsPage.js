import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getRecipes, getFavorites, saveFavorites, imageFallback } from "../data/recipes";

export default function RecipeDetailsPage({ refreshRecipes }) {
 const {id}=useParams(), navigate=useNavigate();
 const recipe=useMemo(()=>getRecipes().find(r=>String(r.id)===String(id)),[id]);
 const [favorite,setFavorite]=useState(()=>getFavorites().includes(String(id))||getFavorites().includes(id));
 if(!recipe)return <div><Header/><main className="page-wrap empty-state"><h1>Recipe not found</h1><p>This recipe may have been removed from your vault.</p><Link className="button button-primary" to="/search">Explore recipes</Link></main><Footer/></div>;
 const isFavorite=getFavorites().includes(recipe.id)||favorite;
 const toggleFavorite=()=>{const ids=getFavorites();const next=ids.includes(recipe.id)?ids.filter(x=>x!==recipe.id):[...ids,recipe.id];saveFavorites(next);setFavorite(next.includes(recipe.id));};
 return <div><Header/><main className="page-wrap">
  <Link className="text-link" to="/search">← Back to recipes</Link>
  <section className="recipe-detail-hero"><div><img className="detail-image" src={recipe.image} alt={recipe.title} onError={imageFallback}/></div><div className="detail-copy"><span className="eyebrow">{recipe.category||"FROM THE VAULT"}</span><h1 style={{marginTop:12}}>{recipe.title||recipe.name}</h1><p>{recipe.description||"A delicious recipe to add to your collection."}</p><div className="detail-facts"><span className="detail-fact">◷ {recipe.prepTime||30} minutes</span><span className="detail-fact">♧ Serves {recipe.servings||2}</span><span className="detail-fact">▤ {recipe.ingredients?.length||0} ingredients</span></div><div className="hero-actions"><button className={`button ${isFavorite?"button-secondary":"button-primary"}`} onClick={toggleFavorite}>{isFavorite?"♥ Saved to favourites":"♡ Save to favourites"}</button><Link className="button button-secondary" to={`/edit-recipe/${recipe.id}`}>Edit recipe</Link></div></div></section>
  <div className="detail-columns"><section className="detail-panel"><span className="eyebrow">GET READY</span><h2 style={{marginTop:8}}>Ingredients</h2><ul>{(recipe.ingredients||[]).map((item,i)=><li key={i}>{item}</li>)}</ul></section><section className="detail-panel"><span className="eyebrow">LET'S COOK</span><h2 style={{marginTop:8}}>Method</h2><ol>{(recipe.steps||[]).map((step,i)=><li key={i}>{step}</li>)}</ol></section></div>
 </main><Footer/></div>;
}

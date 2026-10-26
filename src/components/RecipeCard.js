import React from "react";
import { Link } from "react-router-dom";
import { imageFallback } from "../data/recipes";

export default function RecipeCard({ recipe, favorite = false, onToggleFavorite, onDelete }) {
 const title = recipe.title || recipe.name || "Untitled recipe";
 return <article className="recipe-card">
  <Link to={`/recipe/${recipe.id}`} className="recipe-card-image-wrap" aria-label={`View ${title}`}>
   <img className="recipe-image" src={recipe.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80"} alt={title} loading="lazy" onError={imageFallback}/>
  </Link>
  <div className="recipe-card-body">
   <div className="recipe-meta"><span className="category-pill">{recipe.category || recipe.tags || "Homemade"}</span><span>◷ {recipe.prepTime || 25} min</span></div>
   <h3><Link to={`/recipe/${recipe.id}`}>{title}</Link></h3>
   <p>{recipe.description || "A delicious recipe to add to your collection."}</p>
   <div className="card-actions">
    <Link className="text-link" to={`/recipe/${recipe.id}`}>View recipe ↗</Link>
    <div style={{display:"flex",gap:7}}>
     {onDelete && <button type="button" className="icon-button" onClick={()=>onDelete(recipe.id)} aria-label={`Delete ${title}`} title="Delete recipe">⌫</button>}
     {onToggleFavorite && <button type="button" className={`favorite-button ${favorite?"is-favorite":""}`} onClick={()=>onToggleFavorite(recipe.id)} aria-label={favorite?"Remove from favorites":"Add to favorites"} title={favorite?"Remove favorite":"Add to favorites"}>{favorite?"♥":"♡"}</button>}
    </div>
   </div>
  </div>
 </article>;
}

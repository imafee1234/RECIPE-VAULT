import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeForm from "../components/RecipeForm";
import { getRecipes, saveRecipes } from "../data/recipes";

export default function AddEditRecipePage({ refreshRecipes }) {
 const {id}=useParams(), navigate=useNavigate();
 const recipes=useMemo(()=>getRecipes(),[id]);
 const existing=id?recipes.find(r=>String(r.id)===String(id)):null;
 const submit=data=>{
  const latest=getRecipes();
  if(id&&!existing){window.alert("That recipe could not be found.");return false;}
  if(id) saveRecipes(latest.map(r=>String(r.id)===String(id)?{...r,...data,id:r.id}:r));
  else saveRecipes([{...data,id:typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():String(Date.now())},...latest]);
  refreshRecipes?.();
  return true;
 };
 return <div><Header/><main className="page-wrap"><div className="form-shell"><div className="form-intro"><span className="eyebrow">{existing?"REFINE YOUR RECIPE":"ADD TO YOUR COLLECTION"}</span><h1 style={{marginTop:10}}>{existing?"Edit recipe":"Something delicious starts here."}</h1><p>Keep the ingredients and steps together so this recipe is easy to make again.</p><Link className="text-link" to="/dashboard">← Back to my vault</Link></div>
 {id&&!existing?<div className="empty-state"><h3>Recipe not found</h3><p>It may have been removed from your collection.</p><Link className="button button-primary" to="/dashboard">Return to vault</Link></div>:<RecipeForm key={existing?.id||"new"} formTitle={existing?"Edit recipe":"New recipe"} initialData={existing} onSubmit={submit} onCancel={()=>navigate("/dashboard")}/>}
 </div></main><Footer/></div>;
}

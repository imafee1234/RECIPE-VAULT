import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RecipeForm({ formTitle, initialData, onSubmit, onCancel }) {
 const navigate = useNavigate();
 const [title,setTitle] = useState(initialData?.title || initialData?.name || "");
 const [description,setDescription] = useState(initialData?.description || "");
 const [image,setImage] = useState(initialData?.image || "");
 const [category,setCategory] = useState(initialData?.category || initialData?.tags || "Dinner");
 const [prepTime,setPrepTime] = useState(initialData?.prepTime || 30);
 const [servings,setServings] = useState(initialData?.servings || 2);
 const [ingredients,setIngredients] = useState(initialData?.ingredients?.length ? initialData.ingredients : [""]);
 const [steps,setSteps] = useState(initialData?.steps?.length ? initialData.steps : [""]);
 const [error,setError] = useState("");
 const updateList = (list,setList,index,value) => setList(list.map((item,i)=>i===index?value:item));
 const submit = async e => {
  e.preventDefault();
  const cleanIngredients = ingredients.map(x=>x.trim()).filter(Boolean);
  const cleanSteps = steps.map(x=>x.trim()).filter(Boolean);
  if (!cleanIngredients.length || !cleanSteps.length) {setError("Please add at least one ingredient and one cooking step.");return;}
  const result = onSubmit({id:initialData?.id,title:title.trim(),description:description.trim(),image:image.trim(),category,prepTime:Number(prepTime)||30,servings:Number(servings)||2,ingredients:cleanIngredients,steps:cleanSteps,createdAt:initialData?.createdAt || new Date().toISOString()});
  if (result !== false) navigate("/dashboard");
 };
 return <form className="recipe-form" onSubmit={submit}>
  <div className="form-grid">
   <div className="form-field"><label htmlFor="recipe-title">Recipe name *</label><input id="recipe-title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Sunday jollof rice" required maxLength={100}/></div>
   <div className="form-field"><label htmlFor="recipe-category">Category</label><select id="recipe-category" value={category} onChange={e=>setCategory(e.target.value)}>{["Breakfast","Lunch","Dinner","Nigerian","Dessert","Vegetarian","Snacks","Drinks","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
  </div>
  <div className="form-field"><label htmlFor="recipe-description">A little about this recipe</label><textarea id="recipe-description" value={description} onChange={e=>setDescription(e.target.value)} placeholder="What makes this recipe special?" rows={3}/></div>
  <div className="form-field"><label htmlFor="recipe-image">Image URL</label><input id="recipe-image" type="url" value={image} onChange={e=>setImage(e.target.value)} placeholder="https://example.com/your-dish.jpg"/><span className="form-help">Optional. Use a publicly accessible image URL.</span></div>
  <div className="form-grid">
   <div className="form-field"><label htmlFor="recipe-time">Prep / cook time (minutes)</label><input id="recipe-time" type="number" min="1" max="1440" value={prepTime} onChange={e=>setPrepTime(e.target.value)}/></div>
   <div className="form-field"><label htmlFor="recipe-servings">Servings</label><input id="recipe-servings" type="number" min="1" max="100" value={servings} onChange={e=>setServings(e.target.value)}/></div>
  </div>
  <div className="form-field"><span className="field-label">Ingredients *</span>
   {ingredients.map((item,i)=><div className="dynamic-row" key={`ingredient-${i}`}><input aria-label={`Ingredient ${i+1}`} value={item} onChange={e=>updateList(ingredients,setIngredients,i,e.target.value)} placeholder={`Ingredient ${i+1}`} required={i===0}/>{ingredients.length>1&&<button className="icon-button" type="button" onClick={()=>setIngredients(ingredients.filter((_,idx)=>idx!==i))} aria-label="Remove ingredient">−</button>}</div>)}
   <div><button className="button button-secondary" type="button" onClick={()=>setIngredients([...ingredients,""])}>＋ Add ingredient</button></div>
  </div>
  <div className="form-field"><span className="field-label">Cooking steps *</span>
   {steps.map((item,i)=><div className="dynamic-row" key={`step-${i}`}><textarea aria-label={`Step ${i+1}`} value={item} onChange={e=>updateList(steps,setSteps,i,e.target.value)} placeholder={`Step ${i+1}`} rows={2} required={i===0}/>{steps.length>1&&<button className="icon-button" type="button" onClick={()=>setSteps(steps.filter((_,idx)=>idx!==i))} aria-label="Remove step">−</button>}</div>)}
   <div><button className="button button-secondary" type="button" onClick={()=>setSteps([...steps,""])}>＋ Add step</button></div>
  </div>
  {error&&<p role="alert" style={{color:"#a4472b"}}>{error}</p>}
  <div className="form-actions"><button type="button" className="button button-secondary" onClick={()=>onCancel?onCancel():navigate("/dashboard")}>Cancel</button><button type="submit" className="button button-primary">{initialData?"Save changes":"Save recipe"} ↗</button></div>
 </form>;
}

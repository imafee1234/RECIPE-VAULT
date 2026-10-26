const STORAGE_KEY = "recipe-vault-recipes-v1";
const FAVORITES_KEY = "recipe-vault-favorites-v1";

export const starterRecipes = [
 {id:"1",title:"Creamy Garlic Pasta",description:"A comforting weeknight pasta with garlic, herbs and a silky sauce.",image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",category:"Dinner",prepTime:25,servings:2,ingredients:["200 g pasta","3 cloves garlic, minced","2 tbsp olive oil","1/2 cup cream","Parmesan and parsley"],steps:["Cook pasta in salted water until al dente.","Warm olive oil and gently cook the garlic.","Stir in cream and a splash of pasta water.","Toss with pasta, season and finish with Parmesan."],createdAt:"2026-01-01"},
 {id:"2",title:"Avocado Garden Toast",description:"Fresh avocado, lemon and crunchy greens on toasted sourdough.",image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85",category:"Breakfast",prepTime:10,servings:1,ingredients:["2 slices sourdough","1 ripe avocado","1 tsp lemon juice","Cherry tomatoes","Salt, pepper and chilli flakes"],steps:["Toast the bread until golden.","Mash avocado with lemon, salt and pepper.","Spread over toast and top with tomatoes and chilli."],createdAt:"2026-01-02"},
 {id:"3",title:"Golden Jollof Rice",description:"A rich tomato-pepper rice with warm spices and deep flavour.",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",category:"Nigerian",prepTime:50,servings:4,ingredients:["2 cups long-grain rice","Tomato and red pepper blend","1 onion","2 cups stock","Thyme, curry and bay leaf"],steps:["Rinse rice and set aside.","Fry onion and pepper blend until reduced.","Add stock and seasonings, then stir in rice.","Cover and cook gently until tender, stirring occasionally."],createdAt:"2026-01-03"},
 {id:"4",title:"Berry Breakfast Bowl",description:"A bright bowl of yoghurt, berries, granola and honey.",image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=85",category:"Breakfast",prepTime:8,servings:1,ingredients:["1 cup Greek yoghurt","Mixed berries","1/3 cup granola","1 tsp honey"],steps:["Spoon yoghurt into a bowl.","Arrange berries and granola on top.","Drizzle with honey and serve chilled."],createdAt:"2026-01-04"},
 {id:"5",title:"Herby Roast Chicken",description:"Juicy roast chicken with lemon, herbs and crisp golden skin.",image:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85",category:"Dinner",prepTime:75,servings:4,ingredients:["1 whole chicken","1 lemon","2 tbsp olive oil","Rosemary and thyme","Salt and black pepper"],steps:["Heat oven to 200°C.","Rub chicken with oil, herbs, lemon, salt and pepper.","Roast until cooked through and golden.","Rest for 10 minutes before carving."],createdAt:"2026-01-05"},
 {id:"6",title:"Chocolate Fudge Cake",description:"A deeply chocolatey cake for celebrations or a cosy treat.",image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",category:"Dessert",prepTime:55,servings:8,ingredients:["1 1/2 cups flour","1 cup sugar","1/2 cup cocoa","2 eggs","1 cup milk","1/2 cup oil"],steps:["Heat oven to 175°C and grease a cake tin.","Mix dry ingredients in a bowl.","Whisk in eggs, milk and oil until smooth.","Bake until a skewer comes out clean, then cool."],createdAt:"2026-01-06"}
];

export function getRecipes() {
 try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRecipes));
 } catch (e) { /* storage may be unavailable */ }
 return starterRecipes;
}
export function saveRecipes(recipes) {
 try { localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)); } catch (e) {}
}
export function getFavorites() {
 try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"); } catch (e) { return []; }
}
export function saveFavorites(ids) {
 try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids)); } catch (e) {}
}
export function imageFallback(event) {
 event.currentTarget.onerror = null;
 event.currentTarget.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80";
}

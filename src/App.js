import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AddEditRecipePage from "./pages/AddEditRecipePage";
import UserDashboardPage from "./pages/UserDashboardPage";
import "./App.css";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshRecipes = () => setRefreshKey((key) => key + 1);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage refreshKey={refreshKey} />} />
        <Route path="/search" element={<RecipeSearchPage refreshKey={refreshKey} />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage refreshRecipes={refreshRecipes} />} />
        <Route path="/add-recipe" element={<AddEditRecipePage refreshRecipes={refreshRecipes} />} />
        <Route path="/edit-recipe/:id" element={<AddEditRecipePage refreshRecipes={refreshRecipes} />} />
        <Route path="/dashboard" element={<UserDashboardPage refreshKey={refreshKey} refreshRecipes={refreshRecipes} />} />
        <Route path="*" element={<main className="not-found page-wrap"><span className="eyebrow">404 · NOT FOUND</span><h1>Looks like this page wandered off.</h1><p>The page may have moved, but your next favourite recipe is still waiting.</p><a className="button button-primary" href="/">Back home</a></main>} />
      </Routes>
    </BrowserRouter>
  );
}

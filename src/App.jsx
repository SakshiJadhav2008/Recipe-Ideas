import { useState } from 'react';
import { getRandomRecipe, searchByIngredient } from './api/meals';
import ErrorBox from './components/ErrorBox';
import Loader from './components/Loader';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import SearchBar from './components/SearchBar';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  async function handleSearch(q) {
    setQuery(q);
    setError(null);
    setLoading(true);
    try {
      const res = await searchByIngredient(q);
      setRecipes(res || []);
      if (!res) setError(`No recipes found for "${q}"`);
    } catch (e) {
      setError(e.message);
      setRecipes([]);
    } finally { setLoading(false); }
  }

  async function handleRandom() {
    setError(null);
    setLoading(true);
    try {
      const r = await getRandomRecipe();
      setRecipes([r]);
      setQuery('Random');
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-5 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">Recipe Ideas</h1>
        <span className="text-lg tracking-wide">Cook something delicious</span>
      </div>
      </header>



      <main className="max-w-4xl mx-auto mt-6">
        <SearchBar onSearch={handleSearch} onRandom={handleRandom} />
        <div className="mt-4">
          {loading && <Loader />}
          {error && <ErrorBox message={error} />}
          {!loading && !error && recipes.length === 0 && <p className="text-gray-600 mt-4">Try searching for an ingredient.</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {recipes.map(r => (
              <RecipeCard key={r.idMeal} meal={r} onOpen={(id) => setSelected(id)} />
            ))}
          </div>
        </div>
      </main>

      {selected && <RecipeModal id={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { lookupById } from '../api/meals';
import { parseIngredients } from '../utils/parseIngredients';

export default function RecipeModal({ id, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const m = await lookupById(id);
        if (mounted) setMeal(m);
      } catch (e) {
        if (mounted) setErr(e.message);
      } finally { if (mounted) setLoading(false); }
    })();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { mounted = false; window.removeEventListener('keydown', handler); };
  }, [id, onClose]);

  if (!id) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto p-4 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-600">✕</button>
        {loading && <p>Loading...</p>}
        {err && <p className="text-red-600">{err}</p>}
        {meal && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg" />
              <p className="mt-2 text-sm text-gray-600">{meal.strArea} • {meal.strCategory}</p>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              <h3 className="mt-2 font-medium">Ingredients</h3>
              <ul className="list-disc ml-5 mt-1">
                {parseIngredients(meal).map((it, i) => <li key={i}>{it}</li>)}
              </ul>
              <h3 className="mt-4 font-medium">Instructions</h3>
              <p className="whitespace-pre-line text-sm mt-1">{meal.strInstructions}</p>
              {meal.strYoutube && (
                <a className="inline-block mt-3 text-blue-600" href={meal.strYoutube} target="_blank" rel="noreferrer">YouTube Video</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

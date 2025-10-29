import React from 'react';

export default function RecipeCard({ meal, onOpen }) {
  return (
    <div
      className="bg-white rounded-xl shadow p-2 cursor-pointer hover:shadow-lg transition"
      onClick={() => onOpen(meal.idMeal)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(meal.idMeal); }}
    >
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-sm font-medium">{meal.strMeal}</h3>
    </div>
  );
}

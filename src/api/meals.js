export async function searchByIngredient(ingredient) {
  const q = encodeURIComponent(ingredient.trim());
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data.meals; // null if none
}

export async function lookupById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function getRandomRecipe() {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data.meals[0];
}

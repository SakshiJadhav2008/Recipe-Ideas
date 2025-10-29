export function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${measure ? measure.trim() + ' ' : ''}${ing.trim()}`);
  }
  return list;
}

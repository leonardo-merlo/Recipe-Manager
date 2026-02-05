const searchRecipes = async (query) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();

  if (!data.meals) {
    return [];
  }

  return data.meals.map((meal) => ({
    title: meal.strMeal,
    image: meal.strMealThumb,
    ingredients: formatIngredients(meal),
    instructions: meal.strInstructions,
    source: "api",
    externalId: meal.idMeal,
  }));
};

const formatIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }
  return ingredients.join("\n");
};

export { searchRecipes };

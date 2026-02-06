const parseQuantity = (text) => {
  if (!text) return 1;

  const cleaned = text.trim();

  if (cleaned.includes("/")) {
    const [a, b] = cleaned.split("/");
    const result = parseInt(a) / parseInt(b);
    return isNaN(result) ? 1 : result;
  }

  const num = parseFloat(cleaned);
  return isNaN(num) ? 1 : num;
};

const formatIngredients = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (!ingredientName || ingredientName.trim() === "") continue;

    const quantity = parseQuantity(measure);

    let unit = "";
    if (measure) {
      unit = measure.replace(/[0-9./]/g, "").trim();
    }

    ingredients.push({
      name: ingredientName.trim(),
      quantity,
      unit,
    });
  }

  return ingredients;
};

export const searchRecipes = async (query) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  const data = await response.json();

  if (!data.meals) return [];

  return data.meals.map((meal) => ({
    title: meal.strMeal,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    source: "api",
    externalId: meal.idMeal,
    ingredients: formatIngredients(meal),
  }));
};

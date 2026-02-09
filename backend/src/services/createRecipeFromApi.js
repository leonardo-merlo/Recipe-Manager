import prisma from "../config/database.js";

export const createRecipeFromApi = async (recipe) => {
  // 1️⃣ Criar receita base
  const newRecipe = await prisma.recipe.create({
    data: {
      title: recipe.title,
      image: recipe.image,
      instructions: recipe.instructions,
      source: "api",
      externalId: recipe.externalId,
    },
  });

  // 2️⃣ Processar ingredientes
  for (const ing of recipe.ingredients) {
    // check se existe ingrediente
    let dbIngredient = await prisma.ingredient.findUnique({
      where: { name: ing.name },
    });

    // cria se não existir
    if (!dbIngredient) {
      dbIngredient = await prisma.ingredient.create({
        data: {
          name: ing.name,
          defaultUnit: ing.unit || "",
        },
      });
    }

    // cria relação RecipeIngredient
    await prisma.recipeIngredient.create({
      data: {
        recipeId: newRecipe.id,
        ingredientId: dbIngredient.id,
        quantity: ing.quantity || 1,
        unit: ing.unit || dbIngredient.defaultUnit || "",
      },
    });
  }

  return newRecipe;
};

import prisma from "../config/database.js";

export const addRecipeToShoppingList = async ({
  shoppingListId,
  recipeId,
  multiplier = 1,
}) => {
  const slRecipe = await prisma.shoppingListRecipe.create({
    data: {
      shoppingListId,
      recipeId,
      multiplier,
    },
  });

  await rebuildItems(shoppingListId);

  return slRecipe;
};

export const updateRecipeMultiplier = async (id, multiplier) => {
  const slRecipe = await prisma.shoppingListRecipe.update({
    where: { id: Number(id) },
    data: { multiplier },
  });

  await rebuildItems(slRecipe.shoppingListId);

  return slRecipe;
};

export const removeRecipeFromShoppingList = async (id) => {
  const slRecipe = await prisma.shoppingListRecipe.delete({
    where: { id: Number(id) },
  });

  await rebuildItems(slRecipe.shoppingListId);

  return slRecipe;
};

const rebuildItems = async (shoppingListId) => {
  // apaga todos items
  await prisma.shoppingListItem.deleteMany({
    where: { shoppingListId },
  });

  // pega receitas da lista
  const recipes = await prisma.shoppingListRecipe.findMany({
    where: { shoppingListId },
  });

  for (const r of recipes) {
    const ingredients = await prisma.recipeIngredient.findMany({
      where: { recipeId: r.recipeId },
    });

    for (const ing of ingredients) {
      await prisma.shoppingListItem.create({
        data: {
          shoppingListId,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity * r.multiplier,
          unit: ing.unit,
        },
      });
    }
  }
};

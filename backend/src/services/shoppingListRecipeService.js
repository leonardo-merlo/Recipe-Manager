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

  console.log("RECIPES NA LISTA:", recipes);

  for (const r of recipes) {
    console.log("PROCESSANDO RECEITA:", r.recipeId);

    const ingredients = await prisma.recipeIngredient.findMany({
      where: { recipeId: r.recipeId },
    });

    console.log("INGREDIENTES ENCONTRADOS:", ingredients);

    for (const ing of ingredients) {
      const existingItem = await prisma.shoppingListItem.findUnique({
        where: {
          shoppingListId_ingredientId: {
            shoppingListId,
            ingredientId: ing.ingredientId,
          },
        },
      });

      if (existingItem) {
        await prisma.shoppingListItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + ing.quantity * r.multiplier,
          },
        });
      } else {
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
  }
};

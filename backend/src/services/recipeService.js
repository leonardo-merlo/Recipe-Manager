import prisma from "../config/database.js";
import { validateRecipe } from "../validators/recipeSchema.js";

export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    include: {
      RecipeIngredient: {
        include: {
          ingredient: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getRecipeById = async (id) => {
  return await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
    include: {
      RecipeIngredient: {
        include: {
          ingredient: true,
        },
      },
    },
  });
};

export const createRecipe = async (data) => {
  const validated = validateRecipe(data);

  const recipeIngredients = [];

  for (const ing of validated.ingredients) {
    let ingredient = null;

    // Se já veio ingredientId (receita manual)
    if (ing.ingredientId) {
      ingredient = await prisma.ingredient.findUnique({
        where: { id: ing.ingredientId },
      });
    }

    // Se NÃO veio → procurar pelo nome
    if (!ingredient && ing.name) {
      ingredient = await prisma.ingredient.findFirst({
        where: {
          name: {
            equals: ing.name,
            mode: "insensitive",
          },
        },
      });
    }

    // Se ainda não existe → cria
    if (!ingredient) {
      ingredient = await prisma.ingredient.create({
        data: {
          name: ing.name,
          category: ing.category || null,
        },
      });
    }

    recipeIngredients.push({
      ingredientId: ingredient.id,
      quantity: ing.quantity,
      unit: ing.unit,
    });
  }

  return await prisma.recipe.create({
    data: {
      title: validated.title,
      image: validated.image,
      instructions: validated.instructions,
      source: validated.source,

      RecipeIngredient: {
        create: recipeIngredients,
      },
    },
    include: {
      RecipeIngredient: true,
    },
  });
};

export const updateRecipe = async (id, data) => {
  const validated = validateRecipe(data);

  return await prisma.$transaction([
    prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        title: validated.title,
        image: validated.image,
        instructions: validated.instructions,
        source: validated.source,
      },
    }),

    prisma.recipeIngredient.deleteMany({
      where: { recipeId: parseInt(id) },
    }),

    prisma.recipeIngredient.createMany({
      data: validated.ingredients.map((ing) => ({
        recipeId: parseInt(id),
        ingredientId: ing.ingredientId,
        quantity: ing.quantity,
        unit: ing.unit,
      })),
    }),
  ]);
};

export const deleteRecipe = async (id) => {
  return await prisma.recipe.delete({
    where: { id: parseInt(id) },
  });
};

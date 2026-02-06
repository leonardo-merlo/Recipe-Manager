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
  return await prisma.recipe.create({
    data: {
      title: validated.title,
      image: validated.image,
      instructions: validated.instructions,
      source: validated.source,
      RecipeIngredient: {
        create: validated.ingredients.map((ing) => ({
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
          unit: ing.unit,
        })),
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

import prisma from "../config/database.js";
import { validateRecipe } from "../validators/recipeValidator.js";

export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getRecipeById = async (id) => {
  return await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createRecipe = async (data) => {
  const validatedData = validateRecipe(data);
  return await prisma.recipe.create({
    data: validatedData,
  });
};

export const updateRecipe = async (id, data) => {
  const validatedData = validateRecipe(data);
  return await prisma.recipe.update({
    where: { id: parseInt(id) },
    data: validatedData,
  });
};

export const deleteRecipe = async (id) => {
  return await prisma.recipe.delete({
    where: { id: parseInt(id) },
  });
};

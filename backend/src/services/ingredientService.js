import prisma from "../config/database.js";
import { validateIngredient } from "../validators/ingredientSchema.js";

export const getAllIngredients = async () => {
  return await prisma.ingredient.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getIngredientById = async (id) => {
  return await prisma.ingredient.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createIngredient = async (data) => {
  const validateData = validateIngredient(data);
  return await prisma.ingredient.create({
    data: validateData,
  });
};

export const updateIngredient = async (id, data) => {
  const validateData = validateIngredient(data);
  return await prisma.ingredient.update({
    where: { id: parseInt(id) },
    data: validateData,
  });
};
export const deleteIngredient = async (id) => {
  return await prisma.ingredient.delete({
    where: { id: parseInt(id) },
  });
};

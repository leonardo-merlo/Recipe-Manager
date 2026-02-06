import prisma from "../config/database.js";
import { validateShoppingList } from "../validators/shoppingListSchema.js";

export const getAllShoppingLists = async () => {
  return await prisma.shoppingList.findMany({
    include: {
      ShoppingListItem: {
        include: {
          ingredient: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getShoppingListById = async (id) => {
  return await prisma.shoppingList.findUnique({
    where: { id: parseInt(id) },
    include: {
      ShoppingListItem: {
        include: {
          ingredient: true,
        },
      },
    },
  });
};

export const createShoppingList = async (data) => {
  const validated = validateShoppingList(data);
  return await prisma.shoppingList.create({
    data: validated.data,
    include: {
      ShoppingListItem: {
        include: {
          ingredient: true,
        },
      },
    },
  });
};

export const deleteShoppingList = async (id) => {
  return await prisma.shoppingList.delete({
    where: { id: parseInt(id) },
  });
};

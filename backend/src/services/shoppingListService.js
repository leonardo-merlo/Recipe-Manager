import prisma from "../config/database.js";

export const createShoppingList = async () => {
  return prisma.shoppingList.create({
    data: {},
  });
};

export const getShoppingListById = async (id) => {
  return prisma.shoppingList.findUnique({
    where: { id: Number(id) },
    include: {
      recipes: true,
      items: {
        include: {
          ingredient: true,
        },
      },
    },
  });
};

export const deleteShoppingList = async (id) => {
  return prisma.shoppingList.delete({
    where: { id: Number(id) },
  });
};

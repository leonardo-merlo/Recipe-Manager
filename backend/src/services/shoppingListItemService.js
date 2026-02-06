import prisma from "../config/database.js";
import { validateShoppingListItem } from "../validators/shoppingListItemSchema.js";

export const getItemsByShoppingListId = (shoppingListId) =>
  prisma.shoppingListItem.findMany({
    where: { shoppingListId: parseInt(shoppingListId) },
    include: { ingredient: true },
    orderBy: { createdAt: "asc" },
  });

export const createShoppingListItem = (data) => {
  const validated = validateShoppingListItem(data);
  return prisma.shoppingListItem.create({
    data: validated,
    include: { ingredient: true },
  });
};

export const updateShoppingListItem = (id, data) => {
  const validated = validateShoppingListItem(data);
  return prisma.shoppingListItem.update({
    where: { id: parseInt(id) },
    data: validated,
    include: { ingredient: true },
  });
};

export const deleteShoppingListItem = (id) =>
  prisma.shoppingListItem.delete({ where: { id: parseInt(id) } });

import { z } from "zod";

export const shoppingListItemSchema = z.object({
  shoppingListId: z.number().int(),
  ingredientId: z.number().int(),
  quantity: z.number().int().min(1),
  unit: z.string().max(50),
});

export const validateShoppingListItem = (data) =>
  shoppingListItemSchema.parse(data);

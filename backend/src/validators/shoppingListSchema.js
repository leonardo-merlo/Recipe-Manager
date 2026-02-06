import { z } from "zod";

export const shoppingListSchema = z.object({
  title: z.string().max(100).optional(),
  items: z
    .array(
      z.object({
        ingredientId: z.number().int(),
        quantity: z.number().int().min(1),
        unit: z.string().max(50),
      })
    )
    .optional(),
});

export const validateShoppingList = (data) => shoppingListSchema.parse(data);

import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "O nome do ingrediente é obrigatório"),
  category: z.string().optional(),
});

export const validateIngredient = (data) => ingredientSchema.parse(data);

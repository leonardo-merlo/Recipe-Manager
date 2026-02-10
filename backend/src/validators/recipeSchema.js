import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),

  image: z.string().url("Invalid image URL"),

  instructions: z.string().min(10, "Instructions too short"),

  ingredients: z
    .array(
      z.object({
        ingredientId: z.number().int().positive(),
        quantity: z.number().positive(),
        unit: z.string().optional(),
      }),
    )
    .min(1, "Recipe must have at least one ingredient"),

  source: z.enum(["api", "user"]),
});

export const validateRecipe = (data) => recipeSchema.parse(data);

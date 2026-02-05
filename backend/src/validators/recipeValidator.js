import { z } from "zod";

const recipeSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  image: z.string().url("URL da imagem inválida"),
  ingredients: z
    .string()
    .min(10, "Ingredientes devem ter no mínimo 10 caracteres"),
  instructions: z
    .string()
    .min(10, "Instruções devem ter no mínimo 10 caracteres"),
  source: z.enum(["api", "user"], 'Source deve ser "api" ou "user"'),
});

export const validateRecipe = (data) => {
  return recipeSchema.parse(data);
};

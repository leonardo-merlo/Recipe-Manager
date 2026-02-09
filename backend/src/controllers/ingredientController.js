import * as ingredientService from "../services/ingredientService.js";

export const getAll = async (req, res) => {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.json(ingredients);
    console.log("Ingredientes enviados:", ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const ingredient = await ingredientService.getIngredientById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingrediente não encontrado" });
    }
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log("📦 Body recebido:", req.body);
    const ingredient = await ingredientService.createIngredient(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    console.log("❌ Erro:", error.message);

    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const ingredient = await ingredientService.updateIngredient(
      req.params.id,
      req.body,
    );
    res.json(ingredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await ingredientService.deleteIngredient(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

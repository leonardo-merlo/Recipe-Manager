import * as recipeService from "../services/shoppingListRecipeService.js";

export const addRecipeToShoppingList = async (req, res) => {
  try {
    const data = await recipeService.addRecipeToShoppingList(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRecipeMultiplier = async (req, res) => {
  try {
    const data = await recipeService.updateRecipeMultiplier(
      req.params.id,
      req.body.multiplier,
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRecipeFromShoppingList = async (req, res) => {
  try {
    await recipeService.removeRecipeFromShoppingList(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

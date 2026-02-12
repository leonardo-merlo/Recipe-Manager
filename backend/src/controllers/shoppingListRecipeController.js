import * as recipeService from "../services/shoppingListRecipeService.js";

export const addRecipeToShoppingList = async (req, res) => {
  try {
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const shoppingListId = Number(req.params.id);
    const { recipeId, multiplier } = req.body;

    const data = await recipeService.addRecipeToShoppingList({
      shoppingListId,
      recipeId,
      multiplier,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
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

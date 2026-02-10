import express from "express";
import * as slController from "../controllers/shoppingListController.js";
import * as itemController from "../controllers/shoppingListItemController.js";
import * as recipeController from "../controllers/shoppingListRecipeController.js";

const router = express.Router();

router.post("/", slController.createShoppingList);
router.get("/:id", slController.getShoppingListById);
router.delete("/:id", slController.deleteShoppingList);

router.get("/:id/items", itemController.getItemsByShoppingListId);
router.post("/:id/items", itemController.createShoppingListItem);
router.put("/items/:id", itemController.updateShoppingListItem);
router.delete("/items/:id", itemController.deleteShoppingListItem);

router.post("/:id/recipes", recipeController.addRecipeToShoppingList);
router.put("/recipes/:id", recipeController.updateRecipeMultiplier);
router.delete("/recipes/:id", recipeController.removeRecipeFromShoppingList);

export default router;

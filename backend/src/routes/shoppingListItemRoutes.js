import express from "express";
import * as shoppingListItemController from "../controllers/shoppingListItemController.js";

const router = express.Router();

router.get(
  "/shopping-list-items/:shoppingListId",
  shoppingListItemController.getIAll
);
router.post("/shopping-list-items", shoppingListItemController.create);
router.put("/shopping-list-items/:id", shoppingListItemController.update);
router.delete("/shopping-list-items/:id", shoppingListItemController.remove);

export default router;

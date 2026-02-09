import express from "express";
import * as shoppingListItemController from "../controllers/shoppingListItemController.js";

const router = express.Router();

router.get(
  "/shopping-list-items/:shoppingListId",
  shoppingListItemController.getIAll
);
router.post("/", shoppingListItemController.create);
router.put("/:id", shoppingListItemController.update);
router.delete("/:id", shoppingListItemController.remove);

export default router;

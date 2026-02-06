import express from "express";
import * as shoppingListController from "../controllers/shoppingListController.js";

const router = express.Router();

router.get("/shopping-lists", shoppingListController.getAll);
router.get("/shopping-lists/:id", shoppingListController.getById);
router.post("/shopping-lists", shoppingListController.create);
router.delete("/shopping-lists/:id", shoppingListController.remove);

export default router;

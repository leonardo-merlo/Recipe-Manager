import express from "express";
import * as shoppingListController from "../controllers/shoppingListController.js";

const router = express.Router();

router.get("/", shoppingListController.getAll);
router.get("/:id", shoppingListController.getById);
router.post("/", shoppingListController.create);
router.delete("/:id", shoppingListController.remove);

export default router;

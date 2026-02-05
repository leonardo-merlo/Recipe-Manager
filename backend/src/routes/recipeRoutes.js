import express from "express";
import * as recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.get("/recipes", recipeController.getAll);
router.get("/recipes/:id", recipeController.getById);
router.post("/recipes", recipeController.create);
router.put("/recipes/:id", recipeController.update);
router.delete("/recipes/:id", recipeController.remove);
router.get("/search", recipeController.search);

export default router;

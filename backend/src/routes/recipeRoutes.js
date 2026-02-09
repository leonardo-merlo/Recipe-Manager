import express from "express";
import * as recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", recipeController.getAll);
router.get("/search", recipeController.search);
router.get("/:id", recipeController.getById);
router.post("/", recipeController.create);
router.put("/:id", recipeController.update);
router.delete("/:id", recipeController.remove);
router.post("/from-api", recipeController.createFromApi);

export default router;

import express from "express";
import * as ingredientController from "../controllers/ingredientController.js";

const router = express.Router();

router.get("/ingredient", ingredientController.getAll);
router.get("/ingredient/:id", ingredientController.getById);
router.post("/ingredient", ingredientController.create);
router.put("/ingredient/:id", ingredientController.update);
router.delete("/ingredient/:id", ingredientController.remove);

export default router;

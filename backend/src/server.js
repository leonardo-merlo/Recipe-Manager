import "dotenv/config";
import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Recipe Manager API" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

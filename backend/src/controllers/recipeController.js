import * as recipeService from "../services/recipeService.js";
import { searchMealsFromAPI } from "../services/mealDbService.js";
import { createRecipeFromApi } from "../services/createRecipeFromApi.js";

export const getAll = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log("📦 Body recebido:", req.body);
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.log("❌ Erro:", error.message);

    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res
        .status(400)
        .json({ error: "Parâmetro de pesquisa é obrigatório" });
    }
    const recipes = await searchMealsFromAPI(q);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFromApi = async (req, res) => {
  try {
    const recipe = await createRecipeFromApi(req.body);
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar receita da API" });
  }
};

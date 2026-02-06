import * as shoppingListService from "../services/shoppingListService.js";
import { validateShoppingList } from "../validators/shoppingListSchema.js";

export const getAll = async (req, res) => {
  try {
    const lists = await shoppingListService.getAllShoppingLists();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const list = await shoppingListService.getShoppingListById(req.params.id);
    if (!list) return res.status(404).json({ error: "Lista não encontrada" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const validated = validateShoppingList(req.body);
    const newList = await shoppingListService.createShoppingList(validated);
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await shoppingListService.deleteShoppingList(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

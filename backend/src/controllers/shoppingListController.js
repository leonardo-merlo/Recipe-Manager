import * as shoppingListService from "../services/shoppingListService.js";

export const createShoppingList = async (req, res) => {
  try {
    const list = await shoppingListService.createShoppingList();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShoppingListById = async (req, res) => {
  try {
    const list = await shoppingListService.getShoppingListById(req.params.id);

    if (!list)
      return res.status(404).json({ error: "Shopping list not found" });

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteShoppingList = async (req, res) => {
  try {
    await shoppingListService.deleteShoppingList(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByShoppingListId = async (req, res) => {
  try {
    const items = await itemService.getItemsByShoppingListId(
      req.params.shoppingListId,
    );
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createShoppingListItem = async (req, res) => {
  try {
    const item = await itemService.createShoppingListItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateShoppingListItem = async (req, res) => {
  try {
    const item = await itemService.updateShoppingListItem(
      req.params.id,
      req.body,
    );
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteShoppingListItem = async (req, res) => {
  try {
    await itemService.deleteShoppingListItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

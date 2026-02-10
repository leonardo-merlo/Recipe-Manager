import * as itemService from "../services/shoppingListItemService.js";

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

import * as shoppingListItemService from "../services/shoppingListItemService.js";
import { validateShoppingListItem } from "../validators/shoppingListItemSchema.js";

export const getIAll = async (req, res) => {
  try {
    const items = await shoppingListItemService.getItemsByShoppingListId(
      req.params.shoppingListId
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const validated = validateShoppingListItem(req.body);
    const newItem = await shoppingListItemService.createShoppingListItem(
      validated
    );
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const validated = validateShoppingListItem(req.body);
    const updatedItem = await shoppingListItemService.updateShoppingListItem(
      req.params.id,
      validated
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deletedItem = await shoppingListItemService.deleteShoppingListItem(
      req.params.id
    );
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

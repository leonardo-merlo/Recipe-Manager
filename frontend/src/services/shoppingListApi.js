const API_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:3000/api") +
  "/shopping-lists";

// Shopping List
export const createShoppingList = async () => {
  const res = await fetch(`${API_URL}`, { method: "POST" });
  return res.json();
};

export const getShoppingListById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const deleteShoppingList = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// Shopping List Items
export const getItems = async (shoppingListId) => {
  const res = await fetch(`${API_URL}/${shoppingListId}/items`);
  return res.json();
};

export const createItem = async (shoppingListId, itemData) => {
  const res = await fetch(`${API_URL}/${shoppingListId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return res.json();
};

export const updateItem = async (id, data) => {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
};

// Shopping List Recipes
export const addRecipe = async (shoppingListId, recipeId, multiplier = 1) => {
  const res = await fetch(`${API_URL}/${shoppingListId}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId, multiplier }),
  });
  return res.json();
};

export const updateRecipeMultiplier = async (id, multiplier) => {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ multiplier }),
  });
  return res.json();
};

export const removeRecipe = async (id) => {
  await fetch(`${API_URL}/recipes/${id}`, { method: "DELETE" });
};

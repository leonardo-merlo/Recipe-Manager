const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Algo deu errado");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// RECIPES

export const getAllRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);
  return handleResponse(response);
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  return handleResponse(response);
};

export const createRecipe = async (recipeData) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(response);
};

export const updateRecipe = async (id, recipeData) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(response);
};

export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const searchRecipes = async (query) => {
  const response = await fetch(`${API_URL}/recipes/search?q=${query}`);
  return handleResponse(response);
};

export const createRecipeFromApi = async (recipeData) => {
  const response = await fetch(`${API_URL}/recipes/from-api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  return handleResponse(response);
};

// INGREDIENTS

export const getAllIngredients = async () => {
  console.log("Fetching ingredients from API...");
  const response = await fetch(`${API_URL}/ingredients`);
  console.log("Response received:", response);
  return handleResponse(response);
};

export const createIngredient = async (ingredientData) => {
  const response = await fetch(`${API_URL}/ingredients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredientData),
  });
  return handleResponse(response);
};

// SHOPPING LIST ITEMS

export const getAllShoppingListItems = async (shoppingListId) => {
  const response = await fetch(
    `${API_URL}/shopping-list-items/${shoppingListId}`,
  );
  return handleResponse(response);
};

export const createShoppingListItem = async (itemData) => {
  const response = await fetch(`${API_URL}/shopping-list-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

export const updateShoppingListItem = async (id, itemData) => {
  const response = await fetch(`${API_URL}/shopping-list-items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

export const deleteShoppingListItem = async (id) => {
  const response = await fetch(`${API_URL}/shopping-list-items/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

// SHOPPING LIST

export const getAllShoppingLists = async () => {
  const response = await fetch(`${API_URL}/shopping-lists`);
  return handleResponse(response);
};

export const getShoppingListById = async (id) => {
  const response = await fetch(`${API_URL}/shopping-lists/${id}`);
  return handleResponse(response);
};

export const createShoppingList = async (data) => {
  const response = await fetch(`${API_URL}/shopping-lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const updateShoppingList = async (id, data) => {
  const response = await fetch(`${API_URL}/shopping-lists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteShoppingList = async (id) => {
  const response = await fetch(`${API_URL}/shopping-lists/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

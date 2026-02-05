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
  const response = await fetch(`${API_URL}/search?q=${query}`);
  return handleResponse(response);
};

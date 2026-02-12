import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getShoppingListById,
  updateItem,
  deleteItem,
  updateRecipeMultiplier,
  removeRecipe,
} from "../services/shoppingListApi";
import { getRecipeById } from "../services/api";

function ShoppingList() {
  const { id: paramId } = useParams();

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shoppingListId = paramId || localStorage.getItem("shoppingListId");

  useEffect(() => {
    loadShoppingList();
  }, [shoppingListId]);

  const loadShoppingList = async () => {
    try {
      setLoading(true);
      const data = await getShoppingListById(shoppingListId);
      setList(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar lista");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    await updateItem(itemId, { quantity });
    loadShoppingList();
  };

  const handleDeleteItem = async (itemId) => {
    await deleteItem(itemId);
    loadShoppingList();
  };

  const handleMultiplierChange = async (slRecipeId, multiplier) => {
    await updateRecipeMultiplier(slRecipeId, multiplier);
    loadShoppingList();
  };

  const handleRemoveRecipe = async (slRecipeId) => {
    await removeRecipe(slRecipeId);
    loadShoppingList();
  };

  // ✅ TEXTO WHATSAPP
  const buildWhatsAppText = () => {
    if (!list) return "";

    let text = "*🛒 Lista de Compras*\n\n";

    if (list.recipes?.length) {
      text += "*🍽 Receitas*\n";
      list.recipes.forEach((r) => {
        text += `• ${r.recipe?.title || "Receita"} (x${r.multiplier})\n`;
      });
      text += "\n";
    }

    if (list.items?.length) {
      text += "*🥕 Ingredientes*\n";
      list.items.forEach((i) => {
        text += `• ${i.ingredient?.name} - ${i.quantity} ${i.unit}\n`;
      });
    }

    return text;
  };

  const handleCopy = async () => {
    const text = buildWhatsAppText();
    await navigator.clipboard.writeText(text);
    alert("Lista copiada! 🚀");
  };

  if (loading) return <div style={styles.container}>Carregando...</div>;
  if (error) return <div style={styles.container}>Erro: {error}</div>;
  if (!list)
    return <div style={styles.container}>Nenhuma lista encontrada</div>;

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 25 }}>Minha Lista de Compras</h1>

      {/* RECEITAS */}
      <h2>Receitas</h2>
      {list.recipes?.length ? (
        <div style={styles.grid}>
          {list.recipes.map((recipe) => (
            <div key={recipe.id} style={styles.card}>
              <button
                style={styles.iconDelete}
                onClick={() => handleRemoveRecipe(recipe.id)}
              >
                ✕
              </button>

              <div style={styles.cardContent}>
                <strong>
                  {recipe.recipe?.title || `Receita ${recipe.recipeId}`}
                </strong>

                <div style={styles.inlineControls}>
                  <input
                    type="number"
                    min={1}
                    value={recipe.multiplier}
                    onChange={(e) =>
                      handleMultiplierChange(recipe.id, Number(e.target.value))
                    }
                    style={styles.input}
                  />
                  <span>x</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma receita adicionada</p>
      )}

      {/* ITENS */}
      <h2>Itens</h2>
      {list.items?.length ? (
        <div style={styles.grid}>
          {list.items.map((item) => (
            <div key={item.id} style={styles.card}>
              <button
                style={styles.iconDelete}
                onClick={() => handleDeleteItem(item.id)}
              >
                ✕
              </button>

              <div style={styles.cardContent}>
                <span>{item.ingredient?.name}</span>

                <div style={styles.inlineControls}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    style={styles.input}
                  />
                  <span>{item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum item na lista</p>
      )}

      {/* BOTÃO COPIAR */}
      <button style={styles.copyButton} onClick={handleCopy}>
        Copiar lista para WhatsApp
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
  },

  grid: {
    display: "grid",
    gap: 12,
    marginBottom: 30,
  },

  card: {
    position: "relative",
    padding: "15px 40px 15px 15px",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    background: "white",
  },

  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inlineControls: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },

  input: {
    width: 60,
    padding: 4,
  },

  iconDelete: {
    position: "absolute",
    right: 12,
    top: 12,
    border: "none",
    background: "transparent",
    fontSize: 14,
    opacity: 0.5,
    cursor: "pointer",
  },

  copyButton: {
    width: "100%",
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default ShoppingList;

import { useState, useEffect } from "react";
import { getAllIngredients } from "../services/api";

function RecipeForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    image: initialData.image || "",
    instructions: initialData.instructions || "",
    ingredients: initialData.ingredients || [],
  });

  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantityInput, setQuantityInput] = useState("");

  // 🔥 Carrega ingredientes do banco
  useEffect(() => {
    getAllIngredients().then(setAllIngredients);
  }, []);

  // 🔥 Autocomplete (SEM useEffect)
  const filteredSuggestions = ingredientInput
    ? allIngredients.filter((ing) =>
        ing.name.toLowerCase().startsWith(ingredientInput.toLowerCase()),
      )
    : [];

  // 🔥 Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIngredientInput(ingredient.name);
  };

  const handleAddIngredient = () => {
    if (!selectedIngredient || !quantityInput) return;

    // evita duplicado
    if (
      formData.ingredients.find((i) => i.ingredientId === selectedIngredient.id)
    )
      return;

    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          ingredientId: selectedIngredient.id,
          name: selectedIngredient.name,
          quantity: Number(quantityInput),
          unit: selectedIngredient.defaultUnit,
        },
      ],
    }));

    // reset
    setSelectedIngredient(null);
    setIngredientInput("");
    setQuantityInput("");
  };

  const removeIngredient = (index) => {
    const newList = [...formData.ingredients];
    newList.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      ingredients: newList,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.instructions ||
      !formData.ingredients.length
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* TITLE */}
      <div style={styles.field}>
        <label style={styles.label}>Título *</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* IMAGE */}
      <div style={styles.field}>
        <label style={styles.label}>URL da Imagem</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* INGREDIENTES */}
      <div style={styles.field}>
        <label style={styles.label}>Ingredientes *</label>

        {/* INPUT LINHA PRINCIPAL */}
        <div style={styles.ingredientRow}>
          <input
            placeholder="Digite ingrediente"
            value={ingredientInput}
            onChange={(e) => {
              setIngredientInput(e.target.value);
              setSelectedIngredient(null);
            }}
            style={{ ...styles.input, flex: 2 }}
          />

          <input
            type="number"
            placeholder="Qtd"
            value={quantityInput}
            onChange={(e) => setQuantityInput(e.target.value)}
            style={styles.qtyInput}
          />

          <span style={styles.unitLabel}>
            {selectedIngredient?.defaultUnit || "-"}
          </span>

          <button
            type="button"
            onClick={handleAddIngredient}
            style={styles.addBtn}
          >
            + Adicionar
          </button>
        </div>

        {/* AUTOCOMPLETE */}
        {ingredientInput && filteredSuggestions.length > 0 && (
          <div style={styles.suggestions}>
            {filteredSuggestions.slice(0, 6).map((ing) => (
              <div
                key={ing.id}
                style={styles.suggestionItem}
                onClick={() => handleSelectIngredient(ing)}
              >
                {ing.name}
              </div>
            ))}
          </div>
        )}

        {/* LISTA ADICIONADA */}
        <div style={{ marginTop: 15 }}>
          {formData.ingredients.map((ing, i) => (
            <div key={i} style={styles.addedRow}>
              <span style={{ flex: 2 }}>{ing.name}</span>
              <span>{ing.quantity}</span>
              <span>{ing.unit}</span>

              <button
                type="button"
                onClick={() => removeIngredient(i)}
                style={styles.removeBtn}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div style={styles.field}>
        <label style={styles.label}>Modo de Preparo *</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          style={styles.textarea}
          rows="8"
        />
      </div>

      {/* BUTTONS */}
      <div style={styles.buttons}>
        <button type="submit" style={styles.btnSubmit}>
          {initialData.id ? "Atualizar" : "Criar"} Receita
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.btnCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: { maxWidth: 650, margin: "0 auto" },

  field: { marginBottom: 20 },

  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  ingredientRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  qtyInput: {
    width: 80,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  unitLabel: {
    minWidth: 60,
    fontWeight: "bold",
  },

  addBtn: {
    padding: "10px 14px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  suggestions: {
    border: "1px solid #ddd",
    borderRadius: 6,
    marginTop: 6,
    maxHeight: 160,
    overflowY: "auto",
  },

  suggestionItem: {
    padding: 8,
    cursor: "pointer",
  },

  addedRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 6,
  },

  removeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  textarea: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
  },

  buttons: {
    display: "flex",
    gap: 10,
  },

  btnSubmit: {
    flex: 1,
    padding: 12,
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  btnCancel: {
    flex: 1,
    padding: 12,
    background: "#777",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default RecipeForm;

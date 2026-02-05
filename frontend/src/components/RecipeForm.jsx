import { useState } from "react";

function RecipeForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    image: initialData.image || "",
    ingredients: initialData.ingredients || "",
    instructions: initialData.instructions || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.title || !formData.ingredients || !formData.instructions) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          placeholder="Ex: Bolo de Chocolate"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>URL da Imagem</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          style={styles.input}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Ingredientes * (um por linha)</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="2 xícaras de farinha&#10;3 ovos&#10;1 xícara de açúcar"
          rows="6"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Modo de Preparo *</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="1. Misture os ingredientes secos&#10;2. Adicione os ovos..."
          rows="8"
        />
      </div>

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
  form: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  btnSubmit: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnCancel: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#666",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default RecipeForm;

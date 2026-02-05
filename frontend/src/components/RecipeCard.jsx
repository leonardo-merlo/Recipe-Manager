function RecipeCard({ recipe, onDelete, onEdit }) {
  return (
    <div style={styles.card}>
      <img src={recipe.image} alt={recipe.title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{recipe.title}</h3>
        <p style={styles.source}>
          Fonte: {recipe.source === "api" ? "MealDB" : "Criada por você"}
        </p>
        <div style={styles.buttons}>
          <button onClick={() => onEdit(recipe.id)} style={styles.btnEdit}>
            Editar
          </button>
          <button onClick={() => onDelete(recipe.id)} style={styles.btnDelete}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

// Estilos inline simples (pode mover pra CSS depois)
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    color: "#333",
  },
  source: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "10px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  btnEdit: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDelete: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default RecipeCard;

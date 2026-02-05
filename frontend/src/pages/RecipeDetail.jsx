import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../services/api";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta receita?")) {
      return;
    }

    try {
      await deleteRecipe(id);
      alert("Receita deletada!");
      navigate("/");
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  if (loading) return <div style={styles.container}>Carregando...</div>;
  if (error) return <div style={styles.container}>Erro: {error}</div>;
  if (!recipe)
    return <div style={styles.container}>Receita não encontrada</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/")} style={styles.btnBack}>
          ← Voltar
        </button>
        <div style={styles.actions}>
          <button
            onClick={() => navigate(`/recipes/${id}/edit`)}
            style={styles.btnEdit}
          >
            Editar
          </button>
          <button onClick={handleDelete} style={styles.btnDelete}>
            Deletar
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>{recipe.title}</h1>

        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} style={styles.image} />
        )}

        <div style={styles.section}>
          <h2 style={styles.subtitle}>Ingredientes</h2>
          <div style={styles.text}>
            {recipe.ingredients.split("\n").map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subtitle}>Modo de Preparo</h2>
          <div style={styles.text}>
            {recipe.instructions.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>

        <p style={styles.source}>
          Fonte: {recipe.source === "api" ? "MealDB" : "Criada por você"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  btnBack: {
    padding: "10px 20px",
    backgroundColor: "#666",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnEdit: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDelete: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    marginTop: 0,
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "30px",
  },
  subtitle: {
    borderBottom: "2px solid #4CAF50",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  text: {
    lineHeight: "1.8",
  },
  source: {
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
    marginTop: "30px",
  },
};

export default RecipeDetail;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../services/api";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("ID DO PARAMS:", id);
  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    if (!id) return setError("Receita não encontrada");

    try {
      setLoading(true);
      const data = await getRecipeById(Number(id));
      console.log("DATA:", data);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Tem certeza que deseja deletar esta receita?")) return;

    try {
      await deleteRecipe(id);
      alert("Receita deletada!");
      navigate("/");
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!recipe) return <div>Receita não encontrada</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/")} style={styles.btnBack}>
          ← Voltar
        </button>
        {recipe.source !== "api" && (
          <div style={styles.actions}>
            <button
              onClick={() => navigate(`/recipes/${id}/edit`)}
              style={styles.btnEdit}
            >
              Editareeee
            </button>
            <button onClick={handleDelete} style={styles.btnDelete}>
              Deletar
            </button>
          </div>
        )}
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>{recipe.title}</h1>
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} style={styles.image} />
        )}
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Ingredientes</h2>
          <div style={styles.text}>
            {Array.isArray(recipe.RecipeIngredient)
              ? recipe.RecipeIngredient.map((ri, idx) => (
                  <p key={idx}>
                    • {ri.ingredient?.name} ({ri.quantity}{" "}
                    {ri.unit || ri.ingredient?.defaultUnit})
                  </p>
                ))
              : recipe.ingredients
                  ?.split("\n")
                  .map((item, idx) => <p key={idx}>• {item}</p>)}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.subtitle}>Modo de Preparo</h2>
          <div style={styles.text}>
            {recipe.instructions.split("\n").map((step, idx) => (
              <p key={idx}>{step}</p>
            ))}
          </div>
        </div>
        <p style={styles.source}>
          Fonte: {recipe.source === "api" ? "MealDB" : "Criaaada por você"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  btnBack: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  content: {},
  title: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
  },
  section: {
    marginTop: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  text: {},
  source: {
    marginTop: "20px",
    fontSize: "14px",
    opacity: 0.7,
  },
};

// estilos permanecem iguais

export default RecipeDetail;

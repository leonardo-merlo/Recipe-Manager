import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes, deleteRecipe } from "../services/api";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar receitas quando a página abre
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta receita?")) {
      return;
    }

    try {
      await deleteRecipe(id);
      // Atualiza a lista removendo a receita deletada
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      alert("Receita deletada com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/recipes/${id}/edit`);
  };

  if (loading) {
    return <div style={styles.container}>Carregando...</div>;
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>Erro: {error}</p>
        <button onClick={loadRecipes} style={styles.btnRetry}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Minhas Receitas</h1>
        <div style={styles.headerButtons}>
          <button
            onClick={() => navigate("/recipes/new")}
            style={styles.btnNew}
          >
            + Nova Receita
          </button>
          <button onClick={() => navigate("/search")} style={styles.btnSearch}>
            🔍 Buscar Receitas
          </button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div style={styles.empty}>
          <p>Nenhuma receita salva ainda.</p>
          <p>Crie uma nova ou busque receitas online!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
  },
  btnNew: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnSearch: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnRetry: {
    padding: "10px 20px",
    backgroundColor: "#FF9800",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#666",
  },
  error: {
    color: "#f44336",
    marginBottom: "15px",
  },
};

export default Home;

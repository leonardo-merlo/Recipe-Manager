import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { searchRecipes, createRecipeFromApi } from "../services/api";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    console.log("🔍 Buscando por:", query);
    try {
      setLoading(true);
      setError(null);

      const data = await searchRecipes(query);
      console.log("RESULTADOS API:");

      setResults(data);

      if (data.length === 0) {
        setError("Nenhuma receita encontrada. Tente outro termo!");
      }
    } catch (err) {
      setError("Erro ao buscar receitas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (recipe) => {
    try {
      await createRecipeFromApi(recipe);

      alert("Receita salva!");
      navigate("/");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Buscar Receitas Online</h1>
        <button onClick={() => navigate("/")} style={styles.btnBack}>
          ← Voltar
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && <p style={styles.loading}>Buscando receitas...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {results.length > 0 && (
        <div style={styles.grid}>
          {results.map((recipe, index) => (
            <div key={index} style={styles.card}>
              <img src={recipe.image} alt={recipe.title} style={styles.image} />
              <div style={styles.content}>
                <h3 style={styles.title}>{recipe.title}</h3>
                <p style={styles.preview}>
                  {recipe.ingredients.map((i) => i.name).join(", ")}
                </p>
                <button
                  onClick={() => handleSave(recipe)}
                  style={styles.btnSave}
                >
                  💾 Salvar Receita
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  btnBack: {
    padding: "10px 20px",
    backgroundColor: "#666",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  loading: { textAlign: "center", color: "#666", fontSize: "18px" },
  error: { textAlign: "center", color: "#f44336", fontSize: "16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  image: { width: "100%", height: "200px", objectFit: "cover" },
  content: { padding: "15px" },
  title: { margin: "0 0 10px 0", fontSize: "18px" },
  preview: { fontSize: "14px", color: "#666", marginBottom: "15px" },
  btnSave: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Search;

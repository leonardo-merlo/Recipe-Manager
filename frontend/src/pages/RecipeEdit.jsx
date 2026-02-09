import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { getRecipeById, createRecipe, updateRecipe } from "../services/api";

function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const data = await getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      alert("Erro ao carregar receita: " + err.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const recipeData = { ...formData, source: "user" };
      if (isEditMode) await updateRecipe(id, recipeData);
      else await createRecipe(recipeData);
      alert(`Receita ${isEditMode ? "atualizada" : "criada"}!`);
      navigate("/");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  };

  const handleCancel = () => navigate("/");

  if (loading) return <div style={styles.container}>Carregando...</div>;

  return (
    <div style={styles.container}>
      <h1>{isEditMode ? "Editar Receita" : "Nova Receita"}</h1>
      <RecipeForm
        initialData={recipe || {}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "20px" },
};

export default RecipeEdit;

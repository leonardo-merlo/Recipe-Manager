import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeEdit from "./pages/RecipeEdit";
import ShoppingList from "./pages/ShoppingList";

function App() {
  const shoppingListId = localStorage.getItem("shoppingListId");

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.logo}>
            🍳 Recipe Manager
          </Link>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.link}>
              Home
            </Link>
            <Link to="/search" style={styles.link}>
              Buscar
            </Link>
            <Link to="/recipes/new" style={styles.link}>
              + Nova Receita
            </Link>
            <Link
              to={shoppingListId ? `/shopping-lists/${shoppingListId}` : "/"}
              style={styles.link}
            >
              Lista de Compras
            </Link>
          </div>
        </nav>

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipes/new" element={<RecipeEdit />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
            <Route path="/shopping-lists/:id" element={<ShoppingList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Página 404
function NotFound() {
  return (
    <div style={styles.notFound}>
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/" style={styles.linkHome}>
        Voltar para Home
      </Link>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  nav: {
    backgroundColor: "#4CAF50",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
  main: {
    paddingTop: "20px",
  },
  notFound: {
    textAlign: "center",
    padding: "60px 20px",
  },
  linkHome: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default App;

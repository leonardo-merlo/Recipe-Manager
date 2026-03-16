// scripts/seedIngredients.js
import prisma from "../config/database.js";

async function main() {
  const ingredients = [
    // ================= VEGETAIS =================
    { name: "Tomate", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Cebola", defaultUnit: "g", category: "Vegetal" },
    { name: "Alho", defaultUnit: "dente", category: "Vegetal" },
    { name: "Cenoura", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Batata", defaultUnit: "g", category: "Vegetal" },
    { name: "Batata-doce", defaultUnit: "g", category: "Vegetal" },
    { name: "Abobrinha", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Berinjela", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Pimentão verde", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Pimentão vermelho", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Pimentão amarelo", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Pepino", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Alface", defaultUnit: "maço", category: "Vegetal" },
    { name: "Rúcula", defaultUnit: "maço", category: "Vegetal" },
    { name: "Agrião", defaultUnit: "maço", category: "Vegetal" },
    { name: "Couve", defaultUnit: "folha", category: "Vegetal" },
    { name: "Espinafre", defaultUnit: "maço", category: "Vegetal" },
    { name: "Brócolis", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Couve-flor", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Repolho", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Chuchu", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Beterraba", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Quiabo", defaultUnit: "g", category: "Vegetal" },
    { name: "Milho", defaultUnit: "espiga", category: "Vegetal" },
    { name: "Ervilha", defaultUnit: "g", category: "Vegetal" },
    { name: "Vagem", defaultUnit: "g", category: "Vegetal" },
    { name: "Mandioca", defaultUnit: "g", category: "Vegetal" },
    { name: "Inhame", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Cará", defaultUnit: "unidade", category: "Vegetal" },

    // ================= FRUTAS =================
    { name: "Banana", defaultUnit: "unidade", category: "Fruta" },
    { name: "Maçã", defaultUnit: "unidade", category: "Fruta" },
    { name: "Laranja", defaultUnit: "unidade", category: "Fruta" },
    { name: "Limão", defaultUnit: "unidade", category: "Fruta" },
    { name: "Tangerina", defaultUnit: "unidade", category: "Fruta" },
    { name: "Mamão", defaultUnit: "unidade", category: "Fruta" },
    { name: "Abacaxi", defaultUnit: "unidade", category: "Fruta" },
    { name: "Melancia", defaultUnit: "fatia", category: "Fruta" },
    { name: "Melão", defaultUnit: "fatia", category: "Fruta" },
    { name: "Manga", defaultUnit: "unidade", category: "Fruta" },
    { name: "Uva", defaultUnit: "g", category: "Fruta" },
    { name: "Morango", defaultUnit: "g", category: "Fruta" },
    { name: "Kiwi", defaultUnit: "unidade", category: "Fruta" },
    { name: "Maracujá", defaultUnit: "unidade", category: "Fruta" },
    { name: "Goiaba", defaultUnit: "unidade", category: "Fruta" },
    { name: "Pera", defaultUnit: "unidade", category: "Fruta" },
    { name: "Ameixa", defaultUnit: "unidade", category: "Fruta" },
    { name: "Coco", defaultUnit: "unidade", category: "Fruta" },
    { name: "Açaí", defaultUnit: "g", category: "Fruta" },

    // ================= PROTEÍNAS =================
    { name: "Frango", defaultUnit: "g", category: "Proteína" },
    { name: "Carne bovina", defaultUnit: "g", category: "Proteína" },
    { name: "Carne moída", defaultUnit: "g", category: "Proteína" },
    { name: "Patinho", defaultUnit: "g", category: "Proteína" },
    { name: "Acém", defaultUnit: "g", category: "Proteína" },
    { name: "Alcatra", defaultUnit: "g", category: "Proteína" },
    { name: "Picanha", defaultUnit: "g", category: "Proteína" },
    { name: "Porco", defaultUnit: "g", category: "Proteína" },
    { name: "Lombo suíno", defaultUnit: "g", category: "Proteína" },
    { name: "Bacon", defaultUnit: "g", category: "Proteína" },
    { name: "Linguiça", defaultUnit: "unidade", category: "Proteína" },
    { name: "Ovo", defaultUnit: "unidade", category: "Proteína" },
    { name: "Atum", defaultUnit: "g", category: "Proteína" },
    { name: "Sardinha", defaultUnit: "g", category: "Proteína" },
    { name: "Tilápia", defaultUnit: "g", category: "Proteína" },
    { name: "Salmão", defaultUnit: "g", category: "Proteína" },

    // ================= LATICÍNIOS =================
    { name: "Leite", defaultUnit: "ml", category: "Laticínio" },
    { name: "Queijo muçarela", defaultUnit: "g", category: "Laticínio" },
    { name: "Queijo prato", defaultUnit: "g", category: "Laticínio" },
    { name: "Queijo parmesão", defaultUnit: "g", category: "Laticínio" },
    { name: "Queijo minas", defaultUnit: "g", category: "Laticínio" },
    { name: "Requeijão", defaultUnit: "g", category: "Laticínio" },
    { name: "Iogurte natural", defaultUnit: "g", category: "Laticínio" },
    { name: "Manteiga", defaultUnit: "g", category: "Laticínio" },
    { name: "Creme de leite", defaultUnit: "g", category: "Laticínio" },

    // ================= GRÃOS / CARBO =================
    { name: "Arroz branco", defaultUnit: "g", category: "Grão" },
    { name: "Arroz integral", defaultUnit: "g", category: "Grão" },
    { name: "Feijão carioca", defaultUnit: "g", category: "Grão" },
    { name: "Feijão preto", defaultUnit: "g", category: "Grão" },
    { name: "Lentilha", defaultUnit: "g", category: "Grão" },
    { name: "Grão de bico", defaultUnit: "g", category: "Grão" },
    { name: "Aveia", defaultUnit: "g", category: "Grão" },
    { name: "Macarrão", defaultUnit: "g", category: "Grão" },
    { name: "Farinha de trigo", defaultUnit: "g", category: "Grão" },
    { name: "Farinha de mandioca", defaultUnit: "g", category: "Grão" },
    { name: "Polvilho", defaultUnit: "g", category: "Grão" },

    // ================= TEMPEROS =================
    { name: "Sal", defaultUnit: "g", category: "Tempero" },
    { name: "Açúcar", defaultUnit: "g", category: "Tempero" },
    { name: "Açúcar mascavo", defaultUnit: "g", category: "Tempero" },
    { name: "Mel", defaultUnit: "g", category: "Tempero" },
    { name: "Azeite de oliva", defaultUnit: "ml", category: "Tempero" },
    { name: "Óleo de soja", defaultUnit: "ml", category: "Tempero" },
    { name: "Vinagre", defaultUnit: "ml", category: "Tempero" },
    { name: "Pimenta-do-reino", defaultUnit: "g", category: "Tempero" },
    { name: "Colorau", defaultUnit: "g", category: "Tempero" },
    { name: "Cominho", defaultUnit: "g", category: "Tempero" },
    { name: "Orégano", defaultUnit: "g", category: "Tempero" },
    { name: "Manjericão", defaultUnit: "g", category: "Tempero" },
    { name: "Salsa", defaultUnit: "maço", category: "Tempero" },
    { name: "Cebolinha", defaultUnit: "maço", category: "Tempero" },
    { name: "Canela", defaultUnit: "g", category: "Tempero" },
    { name: "Cacau em pó", defaultUnit: "g", category: "Tempero" },

    // ================= OLEAGINOSAS =================
    { name: "Amendoim", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Castanha de caju", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Castanha do pará", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Nozes", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Amêndoas", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Chia", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Linhaça", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Gergelim", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Semente de abóbora", defaultUnit: "g", category: "Oleaginosa" },
    { name: "Semente de girassol", defaultUnit: "g", category: "Oleaginosa" },
  ];

  for (const ing of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: {},
      create: ing,
    });
  }

  console.log("Ingredientes populados ✅");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });

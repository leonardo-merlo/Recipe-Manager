// scripts/seedIngredients.js
import prisma from "../config/database.js";

async function main() {
  const ingredients = [
    { name: "Tomate", defaultUnit: "unidade", category: "Vegetal" },
    { name: "Cebola", defaultUnit: "g", category: "Vegetal" },
    { name: "Frango", defaultUnit: "g", category: "Proteína" },
    { name: "Banana", defaultUnit: "unidade", category: "Fruta" },
    // ...adicione mais aqui
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

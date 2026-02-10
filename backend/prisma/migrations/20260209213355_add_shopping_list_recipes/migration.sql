/*
  Warnings:

  - A unique constraint covering the columns `[shoppingListId,ingredientId]` on the table `ShoppingListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ShoppingListItem" ADD COLUMN     "isManual" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ShoppingListRecipe" (
    "id" SERIAL NOT NULL,
    "shoppingListId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "multiplier" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingListRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListRecipe_shoppingListId_recipeId_key" ON "ShoppingListRecipe"("shoppingListId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListItem_shoppingListId_ingredientId_key" ON "ShoppingListItem"("shoppingListId", "ingredientId");

-- AddForeignKey
ALTER TABLE "ShoppingListRecipe" ADD CONSTRAINT "ShoppingListRecipe_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListRecipe" ADD CONSTRAINT "ShoppingListRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

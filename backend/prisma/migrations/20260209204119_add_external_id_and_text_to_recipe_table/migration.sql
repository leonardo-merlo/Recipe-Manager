/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "externalId" TEXT,
ALTER COLUMN "instructions" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_externalId_key" ON "Recipe"("externalId");

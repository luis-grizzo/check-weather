/*
  Warnings:

  - You are about to drop the column `description` on the `Place` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "consentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "description",
ADD COLUMN     "about" TEXT NOT NULL;

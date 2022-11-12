/*
  Warnings:

  - Added the required column `slug` to the `Achivements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achivements" ADD COLUMN     "slug" TEXT NOT NULL;

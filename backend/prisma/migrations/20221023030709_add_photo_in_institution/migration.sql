/*
  Warnings:

  - Added the required column `photo` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "photo" TEXT NOT NULL;

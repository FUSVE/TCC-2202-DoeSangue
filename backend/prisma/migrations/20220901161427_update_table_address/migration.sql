/*
  Warnings:

  - You are about to drop the column `institutionId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "institutionId",
DROP COLUMN "userId";

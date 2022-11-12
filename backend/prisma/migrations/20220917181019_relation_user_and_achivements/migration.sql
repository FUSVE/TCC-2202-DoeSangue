-- DropForeignKey
ALTER TABLE "Achivements" DROP CONSTRAINT "Achivements_userAchivementsId_fkey";

-- AlterTable
ALTER TABLE "Achivements" ALTER COLUMN "userAchivementsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userAchivementsId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAchivementsId_fkey" FOREIGN KEY ("userAchivementsId") REFERENCES "UserAchivements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achivements" ADD CONSTRAINT "Achivements_userAchivementsId_fkey" FOREIGN KEY ("userAchivementsId") REFERENCES "UserAchivements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userNotificationsId" TEXT;

-- CreateTable
CREATE TABLE "UserNotifications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userNotificationsId" TEXT,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userNotificationsId_fkey" FOREIGN KEY ("userNotificationsId") REFERENCES "UserNotifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userNotificationsId_fkey" FOREIGN KEY ("userNotificationsId") REFERENCES "UserNotifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

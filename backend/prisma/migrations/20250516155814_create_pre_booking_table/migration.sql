-- CreateEnum
CREATE TYPE "PreBookingStatusEnum" AS ENUM ('Ожидает подтверждения', 'Подтверждена', 'Отклонена');

-- CreateTable
CREATE TABLE "PreBooking" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "guestsCount" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" "PreBookingStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreBooking" ADD CONSTRAINT "PreBooking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

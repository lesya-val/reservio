-- DropForeignKey
ALTER TABLE "PreBooking" DROP CONSTRAINT "PreBooking_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "PreBooking" ADD CONSTRAINT "PreBooking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

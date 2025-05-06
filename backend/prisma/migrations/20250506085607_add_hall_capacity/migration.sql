/*
  Warnings:

  - Added the required column `capacity` to the `halls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "halls" ADD COLUMN     "capacity" INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `cloudinary_id` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "cloudinary_id" TEXT NOT NULL;

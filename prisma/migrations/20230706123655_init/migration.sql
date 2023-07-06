/*
  Warnings:

  - The `id` column on the `Applicant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Applicant_id_key";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id");

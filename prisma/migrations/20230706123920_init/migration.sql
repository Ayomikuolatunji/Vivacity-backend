/*
  Warnings:

  - The primary key for the `Applicant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Applicant_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_id_key" ON "Applicant"("id");

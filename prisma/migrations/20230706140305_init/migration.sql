-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_id_key" ON "Applicant"("id");

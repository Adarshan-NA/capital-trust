-- CreateEnum
CREATE TYPE "public"."Province" AS ENUM ('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT');

-- CreateEnum
CREATE TYPE "public"."Residency" AS ENUM ('citizen', 'permanent_resident', 'other');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('drivers_license', 'passport', 'photo_id');

-- CreateEnum
CREATE TYPE "public"."IntendedUse" AS ENUM ('everyday', 'savings', 'student', 'business');

-- CreateEnum
CREATE TYPE "public"."Employment" AS ENUM ('employed', 'self_employed', 'student', 'unemployed', 'retired');

-- CreateEnum
CREATE TYPE "public"."CaseStatus" AS ENUM ('submitted', 'pending_review', 'rejected', 'approved');

-- CreateEnum
CREATE TYPE "public"."RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "public"."AuditEvent" AS ENUM ('case_created', 'risk_scored');

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "province" "public"."Province" NOT NULL,
    "postal" TEXT NOT NULL,
    "residency" "public"."Residency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Case" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "employment" "public"."Employment" NOT NULL,
    "income" TEXT NOT NULL,
    "intendedUse" "public"."IntendedUse" NOT NULL,
    "status" "public"."CaseStatus" NOT NULL DEFAULT 'submitted',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RiskAssessment" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "level" "public"."RiskLevel" NOT NULL,
    "reasons" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "event" "public"."AuditEvent" NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessment_caseId_key" ON "public"."RiskAssessment"("caseId");

-- CreateIndex
CREATE INDEX "AuditLog_caseId_idx" ON "public"."AuditLog"("caseId");

-- AddForeignKey
ALTER TABLE "public"."Case" ADD CONSTRAINT "Case_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RiskAssessment" ADD CONSTRAINT "RiskAssessment_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "public"."Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

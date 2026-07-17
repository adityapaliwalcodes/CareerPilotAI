/*
  Warnings:

  - The `analysis` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roadmap` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Resume" DROP COLUMN "analysis",
ADD COLUMN     "analysis" JSONB,
DROP COLUMN "roadmap",
ADD COLUMN     "roadmap" JSONB;

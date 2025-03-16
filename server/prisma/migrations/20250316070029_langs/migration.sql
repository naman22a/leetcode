-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Language" ADD VALUE 'go';
ALTER TYPE "Language" ADD VALUE 'rust';
ALTER TYPE "Language" ADD VALUE 'csharp';
ALTER TYPE "Language" ADD VALUE 'ruby';
ALTER TYPE "Language" ADD VALUE 'swift';
ALTER TYPE "Language" ADD VALUE 'php';
ALTER TYPE "Language" ADD VALUE 'kotlin';
ALTER TYPE "Language" ADD VALUE 'dart';
ALTER TYPE "Language" ADD VALUE 'R';
ALTER TYPE "Language" ADD VALUE 'perl';
ALTER TYPE "Language" ADD VALUE 'typescript';
ALTER TYPE "Language" ADD VALUE 'haskell';

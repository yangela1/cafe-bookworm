-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Review" ALTER COLUMN "rating" DROP DEFAULT;

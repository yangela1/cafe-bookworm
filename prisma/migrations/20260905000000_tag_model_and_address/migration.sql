-- AlterEnum
ALTER TYPE "City" ADD VALUE 'North Vancouver';

-- AlterTable (preserve existing street data by renaming)
ALTER TABLE "Cafe" RENAME COLUMN "street" TO "address";
ALTER TABLE "Cafe" DROP COLUMN "hasWifi",
DROP COLUMN "isLaptopFriendly",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "latitude" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CafeTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CafeTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_CafeTags_B_index" ON "_CafeTags"("B");

-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

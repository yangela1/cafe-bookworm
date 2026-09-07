-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Vancouver', 'Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'North Vancouver', 'West Vancouver', 'New Westminster', 'Port Coquitlam', 'Port Moody', 'Delta', 'Langley', 'Maple Ridge', 'Pitt Meadows', 'White Rock', 'Bowen Island', 'Anmore', 'Belcarra', 'Lions Bay');
-- CreateTable
CREATE TABLE "Cafe" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" "City" NOT NULL,
    "siteURL" TEXT,
    "hours" TEXT,
    "googlePlaceId" TEXT,
    "mapsUrl" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "cafeId" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "pricePoint" INTEGER NOT NULL,
    "dateVisited" TIMESTAMP(3) NOT NULL,
    "thoughts" TEXT NOT NULL,
    "recommended" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cafeId" TEXT NOT NULL,
    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
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
CREATE UNIQUE INDEX "Cafe_slug_key" ON "Cafe"("slug");
-- CreateIndex
CREATE UNIQUE INDEX "Cafe_googlePlaceId_key" ON "Cafe"("googlePlaceId");
-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
-- CreateIndex
CREATE INDEX "_CafeTags_B_index" ON "_CafeTags"("B");
-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

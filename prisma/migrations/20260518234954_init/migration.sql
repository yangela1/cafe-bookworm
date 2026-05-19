-- CreateEnum
CREATE TYPE "City" AS ENUM ('VANCOUVER', 'BURNABY', 'RICHMOND', 'SURREY', 'COQUITLAM');

-- CreateTable
CREATE TABLE "Cafe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" "City" NOT NULL,
    "siteURL" TEXT,
    "hours" TEXT,
    "hasWifi" BOOLEAN NOT NULL DEFAULT false,
    "isStudyFriendly" BOOLEAN NOT NULL DEFAULT false,
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

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cafeId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_googlePlaceId_key" ON "Cafe"("googlePlaceId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

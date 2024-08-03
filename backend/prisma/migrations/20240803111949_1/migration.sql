-- CreateTable
CREATE TABLE "Shirt" (
    "id" SERIAL NOT NULL,
    "warna" TEXT NOT NULL,
    "ukuran" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,

    CONSTRAINT "Shirt_pkey" PRIMARY KEY ("id")
);

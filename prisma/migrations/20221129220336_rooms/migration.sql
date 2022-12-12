-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL
);

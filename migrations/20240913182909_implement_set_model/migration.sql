-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "completedReps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "exerciseId" INTEGER,
    CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

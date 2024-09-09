-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "targetSetCount" INTEGER NOT NULL,
    "targetRepCount" INTEGER NOT NULL,
    "workoutFileId" INTEGER,
    CONSTRAINT "Exercise_workoutFileId_fkey" FOREIGN KEY ("workoutFileId") REFERENCES "WorkoutFile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

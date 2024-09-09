-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "targetSetCount" INTEGER NOT NULL,
    "targetRepCount" INTEGER NOT NULL,
    "workoutFileId" INTEGER,
    CONSTRAINT "Exercise_workoutFileId_fkey" FOREIGN KEY ("workoutFileId") REFERENCES "WorkoutFile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("id", "name", "targetRepCount", "targetSetCount", "workoutFileId") SELECT "id", "name", "targetRepCount", "targetSetCount", "workoutFileId" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

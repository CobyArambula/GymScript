/*
  Warnings:

  - A unique constraint covering the columns `[id,workoutFileId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_workoutFileId_key" ON "Exercise"("id", "workoutFileId");

import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { extendedClient } from "@/myDbModule";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Exercise } from "@prisma/client";
import ExerciseListItem from "./ExerciseListItem";

export default function ExerciseList({ viewingFile, highestWorkoutId }: any) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  var loadedExercises: any;

  // On load, if we're viewing a workout, load all exercises for that workout
  // If not ViewingFile, no need to load exercises
  if (viewingFile) {
    loadedExercises = extendedClient.exercise.useFindMany({
      where: { workoutFileId: viewingFile.id },
    });
  }
  useEffect(() => {
    setExercises(loadedExercises);
  }, []);

  return (
    <ThemedView>
      <FlatList
        // If viewingFile,
        data={
          exercises?.length === 0 || exercises === undefined
            ? viewingFile
              ? [
                  {
                    name: "",
                    id: 1, // id === 1 because this should be the first exercise
                    targetSetCount: 0,
                    targetRepCount: 0,
                    workoutFileId: viewingFile.id,
                  },
                ]
              : [
                  {
                    name: "",
                    id: 1,
                    targetSetCount: 0,
                    targetRepCount: 0,
                    // if highestWorkoutId == 1, This is the first exercise, so keep workoutFileId at 1
                    // else, need to set this to 1 more than the highest workoutId. When the workoutFile is created,
                    // its Id will always be highestWorkoutId + 1
                    workoutFileId:
                      highestWorkoutId == 1
                        ? highestWorkoutId
                        : Number(highestWorkoutId) + 1,
                  },
                ]
            : exercises
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />
    </ThemedView>
  );
}

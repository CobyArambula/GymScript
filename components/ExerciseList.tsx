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

  console.log(exercises);

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
                    // If workoutFileId is -1, this is a new exercise, as viewingFile
                    // doesn't have an Id yet. So we'll need to somehow retrieve or predict the
                    // viewingFile.id that's created after file creation so that we can
                    // set the workoutFileId of the ExerciseListItem to the correct value
                    workoutFileId: Number(highestWorkoutId) + 1,
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

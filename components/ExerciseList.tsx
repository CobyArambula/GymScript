import { useState, useEffect } from "react";
import { Button, FlatList } from "react-native";
import { extendedClient } from "@/myDbModule";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Exercise } from "@prisma/client";
import ExerciseListItem from "./ExerciseListItem";

export default function ExerciseList({ viewingFile, highestWorkoutId }: any) {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "",
      targetSetCount: 0,
      targetRepCount: 0,
      workoutFileId: viewingFile?.id,
    },
  ]);

  // On load, if we're viewing a workout, load all exercises for that workout
  // If not ViewingFile, no need to load exercises
  console.log("viewingFile.id in ExerciseList:", viewingFile?.id);

  useEffect(() => {
    async function fetchExercises() {
      if (viewingFile) {
        try {
          const retrievedExercises = await extendedClient.exercise.findMany({
            where: { workoutFileId: viewingFile?.id },
          });
          console.log("retrievedExercises", retrievedExercises);
          if (retrievedExercises.length > 0) {
            setExercises(retrievedExercises);
          }
        } catch (error) {
          console.log("Error fetching exercises:", error);
        }
      }
    }
    fetchExercises();
  }, [viewingFile]);
  return (
    <ThemedView>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseListItem item={item} viewingFile={viewingFile} />
        )}
      />
    </ThemedView>
  );
}

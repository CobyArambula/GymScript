import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { extendedClient } from "@/myDbModule";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Exercise } from "@prisma/client";
import ExerciseListItem from "./ExerciseListItem";

export default function ExerciseList({ props }: any) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // On load, get exercises
  const loadedExercises = extendedClient.exercise.useFindMany();
  useEffect(() => {
    console.log("exercises.length", loadedExercises.length);
    setExercises(loadedExercises);
  }, []);

  return (
    <ThemedView>
      <FlatList
        // If no exercises are found, or if current workout is a new workout,
        // then pass init exercise to FlatList. Otherwise pass in retrieved exercises
        data={
          exercises.length === 0
            ? [
                {
                  id: -1,
                  name: "",
                  targetSetCount: 0,
                  targetRepCount: 0,
                  workoutFileId: -1,
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

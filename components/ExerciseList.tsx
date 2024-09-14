import { useState, useEffect } from "react";
import { Button, FlatList, ScrollView } from "react-native";
import { extendedClient } from "@/myDbModule";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Exercise } from "@prisma/client";
import ExerciseListItem from "./ExerciseListItem";
import ActionButton from "./ActionButton";
import { StyleSheet } from "react-native";

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

  function handleCreateExerciseButton() {
    setExercises((prevExercises) => [
      ...prevExercises,
      {
        id: prevExercises.length + 1,
        name: "",
        targetSetCount: 0,
        targetRepCount: 0,
        workoutFileId: viewingFile?.id,
      },
    ]);
  }

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <ExerciseListItem
          item={item}
          viewingFile={viewingFile}
          handleCreateExerciseButton={handleCreateExerciseButton}
          displayCreateButton={index === exercises.length - 1}
        />
      )}
      ListFooterComponent={<ThemedView style={{ height: 350 }}></ThemedView>}
    />
  );
}

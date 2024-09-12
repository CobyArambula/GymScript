import { useState, useEffect } from "react";
import { Button, FlatList } from "react-native";
import { extendedClient } from "@/myDbModule";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Exercise } from "@prisma/client";
import ExerciseListItem from "./ExerciseListItem";

export default function ExerciseList({ viewingFile, highestWorkoutId }: any) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  // On load, if we're viewing a workout, load all exercises for that workout
  // If not ViewingFile, no need to load exercises
  useEffect(() => {
    async function fetchExercises() {
      if (viewingFile) {
        try {
          const retrievedExercises = await extendedClient.exercise
            .findMany
            // where: { workoutFileId: viewingFile.id },
            ();
          console.log("Retrieved exercises:", retrievedExercises);
          setExercises(retrievedExercises);
        } catch (error) {
          console.log("Error fetching exercises:", error);
        }
      }
    }
    fetchExercises();
  }, [viewingFile]);

  // TODO: successfully retrieve saved exercises and render them onto the exerciseList

  // function createExerciseTest() {
  //   extendedClient.exercise.create({
  //     data: {
  //       name: "test",
  //       targetSetCount: 0,
  //       targetRepCount: 0,
  //       // if highestWorkoutId == 1, This is the first exercise, so keep workoutFileId at 1
  //       // else, need to set this to 1 more than the highest workoutId. When the workoutFile is created,
  //       // its Id will always be highestWorkoutId + 1
  //       workoutFileId: viewingFile.id,
  //     },
  //   });
  // }

  console.log("exercises.length", exercises.length);

  return (
    <ThemedView>
      {/* <Button title="create exercise" onPress={createExerciseTest} /> */}
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
        renderItem={({ item }) => (
          <ExerciseListItem item={item} highestWorkoutId={highestWorkoutId} />
        )}
      />
    </ThemedView>
  );
}

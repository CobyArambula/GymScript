import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TextInput, StyleSheet } from "react-native";
import { extendedClient } from "@/myDbModule";
export default function ExerciseListItem({ item, viewingFile }: any) {
  const [name, setName] = useState(item.name);
  const [targetSetCount, setTargetSetCount] = useState(item.targetSetCount);
  const [targetRepCount, setTargetRepCount] = useState(item.targetRepCount);
  console.log("item.workoutFileId", item.workoutFileId);
  /**
   * Out of all of the user id's, find the Id that is the HIGHEST number.
   * This is because if a user is deleted, the Id will not decrement;
   * it will continue to increment. As a result, any newly created users will
   * have an Id greater than the number of workouts.
   */

  const thisExercise = {
    name: name,
    targetSetCount: targetSetCount,
    targetRepCount: targetRepCount,
    // If file is a new file, workoutFileId will be -1
    //New File's Id will be highestWorkoutId + 1
    workoutFileId: item.workoutFileId,
  };

  useEffect(() => {
    if (item.workoutFileId === -1) {
      // New exercise
      extendedClient.exercise.create({
        data: {
          name: thisExercise.name,
          targetSetCount: thisExercise.targetSetCount,
          targetRepCount: thisExercise.targetRepCount,
          workoutFileId: thisExercise.workoutFileId,
        },
      });
      console.log("create exercise");
    } else if (item.workoutFileId > 0) {
      // Existing exercise
      extendedClient.exercise.update({
        where: { id: item.id },
        data: {
          name: thisExercise.name,
          targetSetCount: thisExercise.targetSetCount,
          targetRepCount: thisExercise.targetRepCount,
          workoutFileId: thisExercise.workoutFileId,
        },
      });
      console.log("update exercise");
    }
    // Reset Data
  }, [thisExercise]);

  return (
    <ThemedView>
      <TextInput // TITLE
        style={styles.title}
        value={name}
        multiline
        placeholder="Exercise Name"
        onChangeText={(text) => {
          setName(text);
        }}
      />
      {name !== "" && (
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText style={styles.targetSetReps}>Sets: </ThemedText>
          <TextInput // TARGETSETCOUNT
            value={targetSetCount}
            placeholder="#"
            style={styles.targetSetReps}
            onChangeText={setTargetSetCount}
          />
          <ThemedText style={[styles.targetSetReps, { marginLeft: 5 }]}>
            Reps:{" "}
          </ThemedText>
          <TextInput // TARGETREPCOUNT
            value={targetRepCount}
            placeholder="#"
            style={styles.targetSetReps}
            onChangeText={setTargetRepCount}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  targetSetReps: {
    fontSize: 17,
  },
});

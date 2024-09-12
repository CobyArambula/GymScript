import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TextInput, StyleSheet } from "react-native";
import { extendedClient } from "@/myDbModule";
export default function ExerciseListItem({ item, highestWorkoutId }: any) {
  console.log("item.workoutFileId", item.workoutFileId);
  const [name, setName] = useState<string>(item.name);
  // This useEffect hook is necessary because the component is being re-rendered
  // when the Exercise is updated, but the `item` prop isn't being updated.
  // This means that the `name` state variable is not being updated, even though
  // the `item` prop is changing.

  const [targetSetCount, setTargetSetCount] = useState(item.targetSetCount);

  const [targetRepCount, setTargetRepCount] = useState(item.targetRepCount);

  // The component is being re-rendered when the Exercise is updated, but the
  // `item` prop isn't being updated. This means that the `name`, `targetSetCount`,
  // and `targetRepCount` state variables are not being updated, even though the
  // `item` prop is changing. This useEffect hook is used to update the state
  // variables whenever the `item` prop changes.
  useEffect(() => {
    setName(item.name);
    setTargetSetCount(item.targetSetCount);
    setTargetRepCount(item.targetRepCount);
  }, [item]);

  const [thisExercise, setThisExercise] = useState<{
    name: string;
    targetSetCount: number;
    targetRepCount: number;
    workoutFileId: number;
  }>({
    name: name,
    targetSetCount: targetSetCount,
    targetRepCount: targetRepCount,
    // If file is a new file, workoutFileId will be -1
    //New File's Id will be highestWorkoutId + 1
    workoutFileId: item.workoutFileId,
  });
  const [newExercise, setNewExercise] = useState<boolean>(
    item.workoutFileId == 1
      ? true
      : item.workoutFileId == Number(highestWorkoutId) + 1
      ? true
      : false
  );

  /**
   * Out of all of the user id's, find the Id that is the HIGHEST number.
   * This is because if a user is deleted, the Id will not decrement;
   * it will continue to increment. As a result, any newly created users will
   * have an Id greater than the number of workouts.
   */

  useEffect(() => {
    setThisExercise({
      name: String(name),
      targetSetCount: Number(targetSetCount),
      targetRepCount: Number(targetRepCount),
      workoutFileId: Number(item.workoutFileId),
    });
  }, [name, targetSetCount, targetRepCount]);

  useEffect(() => {
    try {
      if (newExercise) {
        // New exercise
        extendedClient.exercise.create({
          data: thisExercise,
        });
        console.log("create exercise");
        setNewExercise(false);
      } else {
        // Existing exercise
        extendedClient.exercise.update({
          where: { id: item.id },
          data: thisExercise,
        });
        console.log("update exercise");
      }
    } catch (e) {
      console.log(e);
    }
  }, [thisExercise]);

  return (
    <ThemedView>
      <TextInput // TITLE
        style={styles.title}
        value={name}
        multiline
        placeholder="Exercise Name"
        onChangeText={setName}
      />
      {name !== "" && (
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText style={styles.targetSetReps}>Sets: </ThemedText>
          <TextInput // TARGETSETCOUNT
            value={String(targetSetCount)}
            placeholder="#"
            style={styles.targetSetReps}
            onChangeText={setTargetSetCount}
          />
          <ThemedText style={[styles.targetSetReps, { marginLeft: 5 }]}>
            Reps:{" "}
          </ThemedText>
          <TextInput // TARGETREPCOUNT
            value={String(targetRepCount)}
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

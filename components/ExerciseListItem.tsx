import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TextInput, StyleSheet } from "react-native";
import { extendedClient } from "@/myDbModule";
export default function ExerciseListItem({ item, viewingFile }: any) {
  const [name, setName] = useState<string>(item.name);
  const [targetSetCount, setTargetSetCount] = useState(item.targetSetCount);
  const [targetRepCount, setTargetRepCount] = useState(item.targetRepCount);

  // The component is being re-rendered when the Exercise is updated, but the
  // item prop isn't being updated. This means that the name, targetSetCount,
  // and targetRepCount state variables are not being updated, even though the
  // item prop is changing. This useEffect hook is used to update the state
  // variables whenever the item prop changes.
  useEffect(() => {
    setName(item.name);
    setTargetSetCount(item.targetSetCount);
    setTargetRepCount(item.targetRepCount);
  }, [item]);

  console.log(
    "viewingFile.id (in exerciseListItem)",
    viewingFile?.id ? viewingFile?.id : 1
  );
  function handleSaveExercise() {
    if (!name) {
      return;
    }

    console.log("item.id", item.id);
    const data = {
      name: name,
      targetSetCount: Number(targetSetCount),
      targetRepCount: Number(targetRepCount),
      workoutFileId: viewingFile?.id ? viewingFile?.id : 1, // not sure if this works yet
    };

    console.log("data", data);

    try {
      extendedClient.exercise.upsert({
        where: {
          id: item.id,
          // id_workoutFileId: {
          //   id: item.id,
          //   workoutFileId: viewingFile?.id ? viewingFile?.id : 1,
          // },
        },
        update: data,
        create: { id: item.id, ...data },
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleSaveExercise();
  }, [name, targetSetCount, targetRepCount, item]);

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

import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import { extendedClient } from "@/myDbModule";
import SetList from "./SetList";
import { Colors } from "@/constants/Colors";
import ActionButton from "./ActionButton";
export default function ExerciseListItem({
  item,
  viewingFile,
  handleCreateExerciseButton,
  displayCreateButton,
}: any) {
  const theme = useColorScheme();
  const textColor = Colors[theme!].text as any;
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

  async function handleSaveExercise() {
    if (!name) {
      return;
    }

    const data = {
      name: name,
      targetSetCount: Number(targetSetCount),
      targetRepCount: Number(targetRepCount),
      workoutFileId: viewingFile?.id,
    };

    // console.log("data", data);

    try {
      // Check if the record exists
      const existingExercise = await extendedClient.exercise.findUnique({
        where: {
          id: item.id,
          workoutFileId: viewingFile?.id,
        },
      });

      if (existingExercise) {
        // console.log("Update function is being run");
        await extendedClient.exercise.update({
          where: {
            id: item.id,
          },
          data: data,
        });
      } else {
        // console.log("Create function is being run");
        const createdExercise = await extendedClient.exercise.create({
          data: data,
        });
        item.id = createdExercise.id;
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleSaveExercise();
  }, [name, targetSetCount, targetRepCount]);

  return (
    <ThemedView>
      <TextInput // TITLE
        style={[styles.title, { color: textColor }]}
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
            style={[styles.targetSetReps, { color: textColor }]}
            onChangeText={setTargetSetCount}
          />
          <ThemedText style={[styles.targetSetReps, { marginLeft: 5 }]}>
            Reps:{" "}
          </ThemedText>
          <TextInput // TARGETREPCOUNT
            value={String(targetRepCount)}
            placeholder="#"
            style={[styles.targetSetReps, { color: textColor }]}
            onChangeText={setTargetRepCount}
          />
        </ThemedView>
      )}
      {targetSetCount > 0 && (
        <SetList
          exerciseId={item.id}
          targetSetCount={targetSetCount}
          targetRepCount={targetRepCount}
        />
      )}
      {displayCreateButton && targetSetCount > 0 && (
        <ActionButton
          onPress={handleCreateExerciseButton}
          iconName="add"
          containerStyle={styles.addExerciseButton}
        />
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
  addExerciseButton: {
    marginTop: 5,
    alignSelf: "center",
    borderRadius: 8,
  },
});

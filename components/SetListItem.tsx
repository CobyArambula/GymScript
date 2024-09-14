import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, TextInput } from "react-native";
import { extendedClient } from "@/myDbModule";
export default function SetListItem({
  item,
  targetSetCount,
  targetRepCount,
  setSets,
  index,
}: any) {
  const [completedReps, setCompletedReps] = useState(
    item.completedReps === 0 ? targetRepCount : item.completedReps
  );
  const [weight, setWeight] = useState<Number>(item.weight);
  const [notes, setNotes] = useState<string>(item.notes);

  console.log("item", item);
  useEffect(() => {
    setCompletedReps(
      item.completedReps === 0 ? targetRepCount : item.completedReps
    );
    setWeight(item.weight);
    setNotes(item.notes);
  }, [targetRepCount, item]);

  async function handleSaveSet() {
    const data = {
      completedReps: Number(completedReps),
      weight: Number(weight),
      notes: notes,
      exerciseId: item.exerciseId,
    };

    console.log("data", data);
    try {
      const existingSet = await extendedClient.set.findUnique({
        where: {
          id: item.id,
        },
      });

      if (existingSet) {
        console.log("Set Updated");
        await extendedClient.set.update({
          where: {
            id: item.id,
          },
          data: data,
        });
      } else {
        const createdSet = await extendedClient.set.create({
          data: data,
        });
        item.id = createdSet.id;
        console.log("Set Created");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleSaveSet();
  }, [completedReps, weight, notes]);

  return (
    <ThemedView style={styles.item}>
      <ThemedText type="defaultSemiBold">{index + 1}.</ThemedText>
      <TextInput // COMPLETED REPS
        value={completedReps === 0 ? "" : String(completedReps)}
        placeholder={"# Reps"}
        style={styles.textInput}
        onChangeText={setCompletedReps}
      />
      {completedReps > 0 && (
        <>
          <ThemedText> Reps x</ThemedText>
          <TextInput // WEIGHT
            value={weight === 0 ? "" : String(weight)}
            placeholder={"weight"}
            style={styles.textInput}
            onChangeText={(text) => setWeight(Number(text))}
          />
        </>
      )}
      {Number(weight) > 0 && (
        <>
          <ThemedText style={styles.textInput}>lbs </ThemedText>
          <TextInput // NOTES
            value={notes}
            placeholder={"notes"}
            style={styles.textInput}
            onChangeText={setNotes}
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
    flexDirection: "row",
  },
  textInput: {
    fontSize: 17,
    marginLeft: 5,
    overflow: "scroll",
  },
});

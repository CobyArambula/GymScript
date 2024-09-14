import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, TextInput } from "react-native";
export default function SetListItem({
  item,
  targetSetCount,
  targetRepCount,
  setSets,
}: any) {
  const [completedReps, setCompletedReps] = useState(targetRepCount);
  const [weight, setWeight] = useState<Number>(0);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    setCompletedReps(targetRepCount);
  }, [targetRepCount]);

  return (
    <ThemedView style={styles.item}>
      <ThemedText type="defaultSemiBold">{item.id}.</ThemedText>
      <TextInput // COMPLETED REPS
        value={completedReps}
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

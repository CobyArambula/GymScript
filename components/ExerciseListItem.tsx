import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
export default function ExerciseListItem({ item }: any) {
  console.log("item", item);
  return (
    <ThemedView>
      <ThemedText></ThemedText>
    </ThemedView>
  );
}

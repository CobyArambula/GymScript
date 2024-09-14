import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import SetListItem from "../components/SetListItem";
import { Set } from "@prisma/client";
import { extendedClient } from "@/myDbModule";

export default function SetList({
  exerciseId,
  targetSetCount,
  targetRepCount,
}: any) {
  const theme = useColorScheme() ?? "light";
  const itemColor =
    theme === "light"
      ? Colors.light.background
      : Colors.dark.backgroundSecondary;

  const [sets, setSets] = useState<Set[]>(
    Array.from({ length: targetSetCount }, (_, index) => ({
      id: index + 1,
      completedReps: targetRepCount,
      weight: 0,
      notes: "",
      exerciseId: exerciseId,
    }))
  );

  useEffect(() => {
    async function fetchSets() {
      try {
        const retrievedSets = await extendedClient.set.findMany({
          where: { exerciseId: exerciseId },
        });
        if (retrievedSets.length > 0) {
          setSets(retrievedSets);
          console.log("sets", sets);
        }
      } catch (error) {
        console.log("Error fetching sets:", error);
      }
    }
    fetchSets();
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor: itemColor }]}>
      <FlatList
        data={sets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <SetListItem
            item={item}
            targetSetCount={targetSetCount}
            targetRepCount={targetRepCount}
            setSets={setSets}
            index={index}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    marginTop: 5,
    padding: 12,
    borderRadius: 6,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});

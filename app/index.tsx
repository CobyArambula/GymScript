import ActionButton from "@/components/ActionButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WorkoutFileList from "@/components/WorkoutFileList";
import { extendedClient } from "@/myDbModule";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [highestWorkoutId, setHighestWorkoutId] = useState(1);

  const retrievedHighestWorkoutId = extendedClient.workoutFile.useFindFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });

  useEffect(() => {
    setHighestWorkoutId(retrievedHighestWorkoutId?.id ?? 1);
  }, [retrievedHighestWorkoutId]);

  function createWorkoutFile() {
    extendedClient.workoutFile.create({
      data: {
        id: highestWorkoutId + 1,
        title: "",
        date: new Date(),
      },
    });
    console.log("created");
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText type="title" style={styles.titleText}>
            Workouts
          </ThemedText>
          <ThemedView style={{ flexDirection: "row" }}>
            <ActionButton
              containerStyle={styles.filterButton}
              iconName="filter"
              onPress={() => {}}
            />
            <Link
              asChild
              push
              onPress={createWorkoutFile}
              href={{
                pathname: "/workout-file",
                params: { highestWorkoutId: highestWorkoutId },
              }}
            >
              <ActionButton
                containerStyle={styles.createButton}
                iconName="add"
                title="Create"
                onPress={() => {}}
              />
            </Link>
          </ThemedView>
        </ThemedView>
        <WorkoutFileList highestWorkoutId={highestWorkoutId} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  filterButton: {
    marginRight: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  createButton: {
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});

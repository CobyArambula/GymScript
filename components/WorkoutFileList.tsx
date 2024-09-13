import { Link, router } from "expo-router";
import ActionButton from "./ActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FlatList, StyleSheet } from "react-native";
import { extendedClient } from "@/myDbModule";
import { useEffect, useState } from "react";
import { WorkoutFile } from "@prisma/client/react-native";
import WorkoutFileListItem from "./WorkoutFileListItem";

export default function WorkoutFileList({ highestWorkoutId }: any) {
  const [sortedFiles, setSortedFiles] = useState<WorkoutFile[]>([]);

  const files = extendedClient.workoutFile.useFindMany({
    orderBy: { date: "desc" },
  });

  async function createWorkoutFile() {
    const newWorkoutFile = await extendedClient.workoutFile.create({
      data: {
        id: highestWorkoutId,
        title: "",
        date: new Date(),
      },
    });
    return newWorkoutFile;
  }

  // Handle the "Create" button press
  async function handleCreateWorkoutFile() {
    const newWorkoutFile = await createWorkoutFile();
    if (newWorkoutFile) {
      router.push({
        pathname: "/workout-file",
        params: {
          viewingFile: JSON.stringify(newWorkoutFile),
        },
      });
    }
  }

  useEffect(() => {
    setSortedFiles(files);
  }, [files]);

  if (files.length === 0) {
    return (
      <ThemedView
        style={{
          flex: 1,
          marginBottom: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center", // Add this line
        }}
      >
        <ThemedText style={{ textAlign: "center" }}>Press</ThemedText>
        <ActionButton
          containerStyle={styles.createButton}
          iconName="add"
          title="Create"
          onPress={handleCreateWorkoutFile}
        />

        <ThemedText style={{ textAlign: "center" }}>
          to start your first workout.
        </ThemedText>
      </ThemedView>
    );
  } else {
    return (
      <ThemedView style={styles.container}>
        <FlatList
          data={sortedFiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <WorkoutFileListItem
              item={item}
              highestWorkoutId={highestWorkoutId}
            />
          )}
        />
        <ThemedText style={{ textAlign: "center" }}>
          Total workouts: {files.length}
        </ThemedText>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    marginLeft: 10,
    marginRight: 10,
  },
});

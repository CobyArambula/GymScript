import ActionButton from "@/components/ActionButton";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { extendedClient } from "@/myDbModule";
import { WorkoutFile } from "@prisma/client/react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  useColorScheme,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ExerciseList from "@/components/ExerciseList";
import { Exercise } from "@prisma/client";

export default function WorkoutFileScreen() {
  const theme = useColorScheme();
  const textColor = Colors[theme!].text as any;
  const router = useRouter();
  const routeParams = useLocalSearchParams<{
    highestWorkoutId: any;
    viewingFile?: string;
  }>();
  const viewingFile: WorkoutFile = routeParams.viewingFile
    ? JSON.parse(routeParams.viewingFile)
    : null;

  // useState variables
  const [title, setTitle] = useState(viewingFile ? viewingFile?.title : "");
  const [date, setDate] = useState<Date>(
    viewingFile ? new Date(viewingFile?.date) : new Date()
  );

  function handleSaveWorkoutFile() {
    if (!title) {
      return;
    }

    const data = {
      title: title,
      date: date,
    };

    if (viewingFile) {
      extendedClient.workoutFile.update({
        where: {
          id: viewingFile.id,
        },
        data: data,
      });
    } else {
      extendedClient.workoutFile.create({
        data: data,
      });
    }

    setTitle("");
    setDate(new Date());
    router.setParams({ viewingFile: "" });
    if (router.canDismiss()) {
      router.dismissAll();
    }
  }

  function deleteWorkoutFile() {
    extendedClient.workoutFile.delete({
      where: {
        id: viewingFile?.id, // If we create a workoutFile on the press of create in index, then there
        // SHOULD be a viewingFile
      },
    });
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Link
          asChild
          href={{
            pathname: "/",
          }}
        >
          {title ? (
            <ActionButton
              title="Done"
              onPress={handleSaveWorkoutFile}
              containerStyle={{
                alignSelf: "flex-end",
                marginTop: 20,
                marginBottom: 5,
              }}
            />
          ) : (
            <ActionButton
              iconName="close"
              onPress={() => {
                deleteWorkoutFile();
                router.setParams({ viewingFile: "" });
                if (router.canDismiss()) {
                  router.dismissAll();
                }
              }}
              containerStyle={{
                alignSelf: "flex-end",
                marginTop: 20,
                marginBottom: 5,
              }}
            />
          )}
        </Link>
        <TextInput
          multiline
          style={[
            styles.title,
            {
              color: textColor,
            },
          ]}
          placeholder="Untitled Workout"
          value={title}
          onChangeText={setTitle}
        />
        <DateTimePicker
          value={date}
          mode="datetime"
          style={styles.dateTimePicker}
          onChange={(event, date) => {
            setDate(date!);
          }}
        />
        <ExerciseList
          viewingFile={viewingFile}
          highestWorkoutId={routeParams.highestWorkoutId}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  dateTimePicker: {
    alignSelf: "baseline",
    marginTop: 5,
    marginLeft: -10,
  },
});

import { Link } from "expo-router";
import {
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  View,
  Share,
  Pressable,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { extendedClient } from "@/myDbModule";

export default function WorkoutFileListItem({ item, highestWorkoutId }: any) {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "light" ? Colors.light.icon : Colors.dark.icon;
  "light" ? Colors.light.icon : Colors.dark.icon;
  const itemColor =
    theme === "light"
      ? Colors.light.background
      : Colors.dark.backgroundSecondary;

  const { showActionSheetWithOptions } = useActionSheet();
  const deleteWorkoutFile = (id: number) => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: {
            extendedClient.workoutFile.delete({
              where: { id: id },
            });
            break;
          }
          case cancelButtonIndex: {
          }
        }
      }
    );
  };

  return (
    <Link
      asChild
      href={{
        pathname: "/workout-file",
        params: {
          viewingFile: JSON.stringify(item),
          highestWorkoutId: highestWorkoutId,
        },
      }}
    >
      <TouchableOpacity>
        <ThemedView style={[styles.item, { backgroundColor: itemColor }]}>
          <ThemedView
            style={{ flexDirection: "column", backgroundColor: "transparent" }}
          >
            <ThemedText style={styles.name} type="subtitle">
              {item.title}
            </ThemedText>
            <ThemedText style={styles.date}>
              {new Date(item.date).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="share"
              size={24}
              color={iconColor}
              onPress={() => {}}
              // TODO add export functionality
            />
            <Pressable onPress={() => deleteWorkoutFile(item.id)}>
              <Ionicons
                name="trash"
                size={24}
                color={iconColor}
                style={styles.trash}
              />
            </Pressable>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: 5,
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
  name: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  trash: {
    marginLeft: 16,
  },
});

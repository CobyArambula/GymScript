import { initializeDb } from "@/myDbModule";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb();
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    setup();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !isLoading) {
    return null;
  }

  return (
    <ActionSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="workout-file" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ActionSheetProvider>
  );
}

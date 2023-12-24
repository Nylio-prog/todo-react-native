import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import Snow from "react-native-snow-bg";

//style components
import { Container } from "./styles/appStyles";
import Home from "./components/Home";

import { useLocalNotification } from "./components/hooks/use-local-notification";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSnowTheme, setIsSnowTheme] = useState(true);

  const initialTodos = [];

  const [todos, setTodos] = useState(initialTodos);

  useLocalNotification();

  useEffect(() => {
    async function prepare() {
      try {
        AsyncStorage.getItem("storedTodos")
          .then((data) => {
            if (data !== null) {
              setTodos(JSON.parse(data));
            }
          })
          .catch((error) => console.log(error));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Container onLayout={onLayoutRootView}>
      {isSnowTheme && (
        <Snow fullScreen snowflakesCount={50} fallSpeed="medium" />
      )}
      <Home
        todos={todos}
        setTodos={setTodos}
        isSnowTheme={isSnowTheme}
        setIsSnowTheme={setIsSnowTheme}
      />
      <StatusBar style="light" />
    </Container>
  );
}

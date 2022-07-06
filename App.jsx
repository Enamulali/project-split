import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MyTabs from "./src/screens/NavBar";
import Chores from "./src/screens/Chores";
import Registration from "./src/screens/Registration";
import SetupProfile from "./src/screens/SetupProfile";
import Login from "./src/screens/Login";
import CurrentUserContext from "./src/contexts/CurrentUserContext";
import SetupHousehold from "./src/screens/SetupHousehold";
import Msg from "./src/screens/Msg";
import Chat from "./src/screens/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#00061A" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
    headerShown: "false",
  };

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <CurrentUserContext.Provider value={currentUser}>
        <Stack.Navigator
          screenOptions={globalScreenOptions}
          initialRouteName="Welcome"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={Registration} />
          <Stack.Screen name="App" component={MyTabs} />
          <Stack.Screen name="Setup" component={SetupProfile} />
          <Stack.Screen name="Setup Household" component={SetupHousehold} />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ route }) => ({
              title: route.params.userName,
            })}
          />
          <Stack.Screen name="Msg" component={Msg} />
        </Stack.Navigator>
      </CurrentUserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

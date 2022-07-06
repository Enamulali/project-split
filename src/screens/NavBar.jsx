import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import Profile from "./Profile";
import Groups from "./Groups";
import Chores from "./Chores";
import AddChore from "./AddChore";
import SettingsScreen from "./SettingsScreen";
import Msg from "./Msg";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: { backgroundColor: "#A7C4BC" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: "Groups",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Chore"
        component={AddChore}
        options={{
          tabBarLabel: "Add Chore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chores"
        component={Chores}
        options={{
          tabBarLabel: "Chores",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={Msg}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({});

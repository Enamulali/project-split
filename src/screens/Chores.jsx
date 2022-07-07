import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getChoresByHouseholdId, getUserDataById } from "../utils/api";
import ChoreCard from "./ChoreCard";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const Chores = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [householdChores, setHouseholdChores] = useState([]);
  const [isMyChores, setIsMyChores] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});

  const myChores = householdChores.filter(
    (chore) => chore.users_assigned === currentUserData.username
  );

  const toggleChores = () => setIsMyChores((previousState) => !previousState);

  useFocusEffect(
    React.useCallback(() => {
      getChoresByHouseholdId(currentUser).then((chores) => {
        setHouseholdChores(chores);
      });
      getUserDataById(currentUser.uid).then((userData) => {
        setCurrentUserData(userData);
      });
    }, [])
  );

  return (
    <ScrollView style={styles.back}>
      <View style={styles.banner}>
        <Text style={[styles.cardContent, styles.heading]}>
          {isMyChores ? "My chores" : "All chores"}
        </Text>
      </View>
      <View style={styles.listChores}>
        <View style={{ alignItems: "center" }}>
          <Switch
            trackColor={{ false: "white", true: "#A7C4BC" }}
            thumbColor={isMyChores ? "#5E8B7E" : "#f4f3f4"}
            onValueChange={toggleChores}
            value={isMyChores}
          />
        </View>
        {(isMyChores ? myChores : householdChores).map((chore) => {
          return (
            <ChoreCard
              chore={chore}
              householdChores={householdChores}
              setHouseholdChores={setHouseholdChores}
              key={chore.chore_id}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Chores;

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 125,
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    color: "white",
    alignItems: "center",
  },
  listChores: {
    marginTop: -60,
  },
});

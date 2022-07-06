import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getChoresByHouseholdId } from "../utils/api";
import ChoreCard from "./ChoreCard";
import { ScrollView } from "react-native-gesture-handler";

const Chores = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [householdChores, setHouseholdChores] = useState([]);

  useEffect(() => {
    getChoresByHouseholdId(currentUser).then((chores) => {
      setHouseholdChores(chores);
    });
  }, []);

  return (
    <ScrollView style={styles.back}>
      <View style={styles.banner}>
        <Text style={[styles.cardContent, styles.heading]}>All chores</Text>
      </View>
      <View style={styles.listChores}>
        {householdChores.map((chore) => {
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
  back: {
    backgroundColor: "#DFEEEA",
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

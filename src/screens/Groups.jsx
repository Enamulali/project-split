import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  getBadges,
  getChoresByHouseholdId,
  getUsersByHousehold,
  patchChoreVotes,
} from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Avatar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

const Groups = () => {
  const currentUser = useContext(CurrentUserContext);
  const [usersData, setUsersData] = useState([]);
  const [choresData, setChoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [choreVotes, setChoreVotes] = useState(0);

  useEffect(() => {
    getUsersByHousehold(currentUser).then((users) => {
      setUsersData(users);
    });
    getChoresByHouseholdId(currentUser).then((chores) => {
      setChoresData(chores);
    });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.bg_colour}>
          <Text style={[styles.cardContent, styles.heading]}>
            My Housemates
          </Text>
        </View>
        <View style={styles.infoCard}>
          <ScrollView horizontal>
            {usersData.map((user) => {
              return (
                <View key={user.username} style={styles.cardContent}>
                  <Text style={styles.username}>{user.username}</Text>
                  <Avatar.Image
                    source={{
                      uri: user.avatar_url,
                    }}
                    size={80}
                    style={styles.avatarBackground}
                  />

                  <Text style={styles.points}>
                    <FontAwesome5
                      style={styles.icon}
                      name="medal"
                      size={12}
                      color="#5E8B7E"
                    />
                    {user.points}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.bg_colour}>
          <Text style={[styles.cardContent, styles.heading]}>
            Recently Completed
          </Text>
        </View>
        <View style={styles.infoCard}>
          <ScrollView horizontal>
            {choresData.map((chore) => {
              return chore.is_completed ? (
                <View key={chore.chore_id} style={styles.cardContent}>
                  <View style={styles.userInfoSection}></View>
                  <Text style={styles.username}>{chore.chore_name}</Text>
                  <Text>Difficulty: {chore.difficulty}</Text>
                  <Text>Completed: {chore.is_completed}</Text>
                  <Text>Votes: {chore.votes + choreVotes}</Text>
                  <View style={styles.userInfoSection}></View>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      const chore_id = chore.chore_id;
                      patchChoreVotes(chore_id);
                    }}
                  >
                    <Text>Like</Text>
                  </Pressable>
                </View>
              ) : null;
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  bg_colour: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 125,
    alignItems: "center",
  },
  infoCard: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: -40,
    marginBottom: 20,
  },
  avatarBackground: {
    backgroundColor: "#5E8B7E",
  },
  cardContent: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    color: "white",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F5D62",
    paddingBottom: 10,
  },
  points: {
    fontSize: 12,
    color: "#5E8B7E",
    paddingTop: 10,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 10,
    backgroundColor: "#DFEEEA",
  },
  icon: {
    marginRight: 5,
  },
});

import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getBadges, getHouseholdbyUser, getUserDataById } from "../utils/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
const { width } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase-config";
import { FontAwesome5 } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState({});
  const [household, setHousehold] = useState({});
  const [userBadges, setUserBadges] = useState([]);

  const userData = useContext(CurrentUserContext);
  useEffect(() => {
    getUserDataById(userData.uid).then((res) => {
      setUser(res);
    });
    getHouseholdbyUser(userData.uid).then((res) => {
      setHousehold(res);
    });
  }, []);

  //grabbing users badges from firestore
  useEffect(() => {
    if (user.badges_achieved) {
      const badge = user.badges_achieved;
      console.log(badge);

      badge.forEach((b) => {
        getBadges(b).then((res) => {
          setUserBadges((curr) => {
            return [...curr, res];
          });
        });
      });
    }
  }, [user]);
  console.log(userBadges);

  //this is the signout function that definately works in the settingsScreen and this should now work on the profile page. Worked for me!!
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.bg_colour}>
          <Text style={styles.username_title}>Welcome {user.username}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: user.avatar_url,
            }}
            style={styles.circle_radius}
          ></Image>
        </View>

        <View>
          <TouchableRipple onPress={signOutUser}>
            <View style={styles.listItem}>
              <Icon name="logout" color="#777777" size={25} />
              <Text style={styles.listItemText}>Sign out</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.infoCard}>
          <FontAwesome5 name="house-user" size={20} color="#2F5D62" />
          <Text style={styles.subtitle}>
            {`    ${household.household_name}`}
          </Text>
        </View>
        <View style={styles.infoCard2}>
          <Text style={styles.subtitle}>Invite your housemates!</Text>
          <Text selectable={true}> {user.household_id}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.subtitle}>My points: {user.points}</Text>
        </View>
        {/* this is displaying the current users badges */}
        <View style={styles.infoCard}>
          <Text style={styles.subtitle}>My badges</Text>
          {userBadges.map((badge) => {
            return (
              <View key={badge.name}>
                <Avatar.Image
                  source={{
                    uri: badge.img_url,
                  }}
                  size={60}
                  style={styles.badge}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.subtitle}>Your upcoming chores</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bg_colour: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 150,
    alignItems: "center",
  },
  circle_radius: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: -70,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "white",
    overflow: "hidden",
  },
  username_title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
    color: "white",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F5D62",
    paddingBottom: 10,
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
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    textAlign: "left",
  },
  listItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "left",
  },
  badge: {
    backgroundColor: "transparent",
  },
  infoCard2: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

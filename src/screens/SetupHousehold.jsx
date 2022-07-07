import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import React, { useState } from "react";
import { patchUserWithHouseholdId, postHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

const SetupHousehold = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handlePressCreate = () => {
    setShowForm(true);
  };

  const handlePressJoin = () => {
    setShowJoinForm(true);
  };

  const userId = currentUser ? currentUser.uid : null;

  const handleSubmit = () => {
    postHousehold(userId, householdName).then(() => {
      navigation.navigate("App");
    });
  };

  const handleSubmitJoin = () => {
    patchUserWithHouseholdId(userId, householdId).then(() => {
      navigation.navigate("App");
    });
  };

  const { colors } = useTheme();

  return (
    <LinearGradient colors={["#2F5D62", "#01ab9d"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Set up your Household</Text>
      </View>
      <View style={styles.footer}>
        {/* //create a household button */}

        <TouchableOpacity
          onPress={handlePressCreate}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#009387",
              },
            ]}
          >
            Create a household
          </Text>
        </TouchableOpacity>

        {!showForm ? null : (
          <SafeAreaView>
            <TextInput
              style={styles.TextInput}
              placeholder="Household name"
              value={householdName}
              onChangeText={setHouseholdName}
            />

            {/* Create button */}

            <View style={styles.create_button}>
              <LinearGradient
                colors={["#22577E", "#01ab9d"]}
                style={styles.signIn}
              >
                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </SafeAreaView>
        )}

        {/* Join a household button */}

        <TouchableOpacity
          onPress={handlePressJoin}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text style={[styles.textSign, { color: "#009387" }]}>
            Join a household
          </Text>
        </TouchableOpacity>

        {!showJoinForm ? null : (
          <SafeAreaView>
            <TextInput
              style={styles.TextInput}
              placeholder="Household key"
              value={householdId}
              onChangeText={setHouseholdId}
            />

            <View style={styles.create_button}>
              <LinearGradient
                colors={["#22577E", "#01ab9d"]}
                style={styles.signIn}
              >
                <TouchableOpacity onPress={handleSubmitJoin}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Join
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </SafeAreaView>
        )}
      </View>
    </LinearGradient>
  );
};

export default SetupHousehold;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#DFEEEA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 50,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 1,
  },
  TextInput: {
    padding: 30,
    fontSize: 20,
  },
});

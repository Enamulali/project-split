import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StatusBar } from "expo-status-bar";
import { postChore, getUsersByHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Avatar } from "react-native-paper";

const Addchore = () => {
  const [choreName, setChoreName] = useState("");
  const [choreDescription, setChoreDescription] = useState("");
  const [openDifficulty, setOpenDifficulty] = useState(false);
  const user = useContext(CurrentUserContext);
  const userID = user.uid;

  const [difficultyValue, setDifficultyValue] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [difficulty, setDifficulty] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);

  const [assignUserOptions, setAssignUserOptions] = useState([]);

  const [clickedUser, setClickedUser] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const checkClicked = (username) => {
    if (clickedUser === username) {
      setClickedUser("");
    } else {
      setClickedUser(username);
    }
  };
  useEffect(() => {
    getUsersByHousehold(currentUser).then((users) => {
      setAssignUserOptions(users);
    });
  }, []);
  console.log(userID);
  const addChore = () => {
    postChore(userID, {
      choreName,
      choreDescription,
      difficulty: difficultyValue,
      day,
      month,
      clickedUser,
    })
      .then(() => {
        setChoreName("");
        setChoreDescription("");
        setMonth("");
        setDay("");
        setClickedUser("");
        alert("Your chore has been added");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Text style={styles.titleContainer}>What needs doing?!</Text>
        <View style={styles.allInput}>
          <TextInput
            style={styles.input}
            placeholder="Chore Name "
            value={choreName}
            onChangeText={setChoreName}
          />

          <TextInput
            style={styles.input}
            placeholder="Chore Description"
            value={choreDescription}
            onChangeText={setChoreDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Day"
            value={day}
            onChangeText={setDay}
            maxLength={2}
            keyboardType={"number-pad"}
          />

          <TextInput
            style={styles.input}
            placeholder="Month"
            value={month}
            onChangeText={setMonth}
            maxLength={2}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={styles.difficultyDropdown}>
          <Text style={styles.difficultyFont}>Difficulty:</Text>
          <DropDownPicker
            placeholder="Select difficulty"
            open={openDifficulty}
            value={difficultyValue}
            items={difficulty}
            setOpen={setOpenDifficulty}
            setValue={setDifficultyValue}
            setItems={setDifficulty}
          />

          <ScrollView horizontal style={styles.userContainer}>
            {assignUserOptions.map((user) => {
              return (
                <Pressable
                  key={user.username}
                  style={{
                    backgroundColor: clickedUser === user.username ? "red" : "",
                  }}
                  onPress={() => {
                    checkClicked(user.username);
                  }}
                >
                  <View style={styles.userText}>
                    <Text style={styles.userText}> {user.username}</Text>
                    <Avatar.Image
                      style={styles.avatarBackground}
                      source={{
                        uri: user.avatar_url,
                      }}
                      size={80}
                    />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <Pressable style={styles.button} onPress={addChore}>
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Addchore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    width: 300,
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
    fontSize: 20,
    borderWidth: "thin",
    borderStyle: "double",
  },
  inputContainer: {
    width: 300,
  },
  titleContainer: {
    fontStyle: "italic",
    fontSize: 40,
    marginBottom: 50,
  },
  registerMessage: {
    marginTop: 20,
    marginBottom: -10,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  difficultyDropdown: {
    fontSize: 16,
    // left: 80,
    border: "none",
    cursor: "pointer",
    alignSelf: "center",
    alignItems: "flex-start",
    alignSelf: "baseline",
    margin: "20px",
  },
  difficultyFont: {
    fontSize: "large",
  },
  userClicked: {
    backgroundColor: "white",
  },
  userText: {},
  avatarBackground: {
    backgroundColor: "#5E8B7E",
    paddingTop: 10,
  },
  userContainer: {
    marginRight: 100,
  },
});

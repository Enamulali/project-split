import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
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
    <ScrollView>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.heading}>Who's doing what?</Text>
        </View>
        <View style={styles.wholePage}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Chore name"
              value={choreName}
              onChangeText={setChoreName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
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
          <View style={styles.assignUser}>
            <Text style={styles.font}>Assign a housemate:</Text>
            <ScrollView horizontal style={styles.userContainer}>
              {assignUserOptions.map((user) => {
                return (
                  <Pressable
                    key={user.username}
                    style={{
                      backgroundColor:
                        clickedUser === user.username ? "#5E8B7E" : "",
                      borderRadius: 5,
                      padding: 16,
                    }}
                    onPress={() => {
                      checkClicked(user.username);
                    }}
                  >
                    <View style={styles.userText}>
                      <Text
                        style={{
                          color:
                            clickedUser === user.username ? "white" : "black",
                          paddingBottom: 4,
                          fontSize: 18,
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        {user.username}
                      </Text>
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
          <View style={styles.difficultyDropdown}>
            <Text style={styles.font}>Difficulty:</Text>
            <SafeAreaView>
              <DropDownPicker
                dropDownStyle={{ backgroundColor: "#fff" }}
                placeholder="Select difficulty"
                open={openDifficulty}
                value={difficultyValue}
                items={difficulty}
                setOpen={setOpenDifficulty}
                setValue={setDifficultyValue}
                setItems={setDifficulty}
                style={styles.dropdown}
              />
            </SafeAreaView>
          </View>
          <Pressable style={styles.button} onPress={addChore}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Addchore;
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
  wholePage: {
    flex: 1,
    margin: 18,
    marginTop: -40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  inputs: {
    width: "90%",
    marginTop: 16,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#ECF0F1",
    padding: 16,
    margin: 8,
    alignItems: "center",
    fontSize: 20,
    // borderWidth: "thin",
    // borderStyle: "double",
    borderRadius: 6,
  },
  difficultyDropdown: {
    fontSize: 16,
    width: "85%",
    marginVertical: 16,
  },
  dropdown: {
    cursor: "pointer",
    // alignSelf: "center",
    // alignItems: "flex-start",
    borderColor: "black",
    backgroundColor: "white",
    fontSize: 20,
  },
  assignUser: {
    width: "85%",
  },
  registerMessage: {
    marginTop: 20,
    marginBottom: -10,
  },
  button: {
    margin: 24,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2F5D62",
  },
  userText: {
    alignItems: "center",
  },
  font: {
    fontSize: 20,
  },
  addText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  avatarBackground: {
    backgroundColor: "#5E8B7E",
  },
});

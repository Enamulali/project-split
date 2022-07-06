import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { patchUserWithHouseholdId, postHousehold } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

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

  return (
    <View>
      <Button title="Create a household" onPress={handlePressCreate} />
      {!showForm ? null : (
        <SafeAreaView>
          <TextInput
            placeholder="Household name"
            value={householdName}
            onChangeText={setHouseholdName}
          />
          <Button title="Create" onPress={handleSubmit} />
        </SafeAreaView>
      )}
      <Button title="Join a household" onPress={handlePressJoin} />
      {!showJoinForm ? null : (
        <SafeAreaView>
          <TextInput
            placeholder="Household key"
            value={householdId}
            onChangeText={setHouseholdId}
          />
          <Button title="Join" onPress={handleSubmitJoin} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default SetupHousehold;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const SetupProfile = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  //dropdown avatar items
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "Apple",
      value: "https://cdn-icons-png.flaticon.com/512/590/590677.png",
    },
    {
      label: "Banana",
      value: "https://cdn-icons-png.flaticon.com/512/590/590682.png",
    },
    {
      label: "Kiwi",
      value: "https://cdn-icons-png.flaticon.com/512/590/590690.png",
    },
    {
      label: "Orange",
      value: "https://cdn-icons-png.flaticon.com/512/590/590680.png",
    },
    {
      label: "Pear",
      value: "https://cdn-icons-png.flaticon.com/512/590/590679.png",
    },
    {
      label: "Lemon",
      value: "https://cdn-icons-png.flaticon.com/512/590/590681.png",
    },
    {
      label: "Pineapple",
      value: "https://cdn-icons-png.flaticon.com/512/590/590689.png",
    },
    {
      label: "Watermelon",
      value: "https://cdn-icons-png.flaticon.com/512/590/590683.png",
    },
    {
      label: "Strawberry",
      value: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
    },
    {
      label: "Carrot",
      value: "https://cdn-icons-png.flaticon.com/512/590/590695.png",
    },
    {
      label: "Cherry",
      value: "https://cdn-icons-png.flaticon.com/512/590/590687.png",
    },
  ]);

  //create document with current user uid
  const updateUser = () => {
    const user = auth.currentUser;
    setDoc(doc(db, "users", user.uid), {
      avatar_url: value,
      first_name: firstname,
      last_name: surname,
      email: user.email,
      username: username,
      household_id: "",
      points: 0,
      badges_achieved: "",
    }).then(() => {
      navigation.navigate("Setup Household");
    });
  };

  const { colors } = useTheme();

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        {/* page title and header */}
        <LinearGradient
          colors={["#2F5D62", "#01ab9d"]}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.text_header}>Set up your Profile</Text>
          </View>
          {/* page form input */}
          <View style={styles.footer}>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                style={styles.textInput}
                placeholder="FIRSTNAME"
                autoFocus
                autoCapitalize="none"
                value={firstname}
                onChangeText={setFirstname}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="user" color={colors.text} size={20} />
              <TextInput
                style={styles.textInput}
                placeholder="SURNAME"
                autoFocus
                autoCapitalize="none"
                value={surname}
                onChangeText={setSurname}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="id-badge" color={colors.text} size={20} />
              <TextInput
                style={styles.textInput}
                placeholder="USERNAME"
                autoFocus
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            {/* pick avatar url */}
            <Text style={[styles.text_footer, { marginTop: 60 }]}>
              PROFILE PHOTO
            </Text>
            <View style={styles.action}>
              <ScrollView horizontal>
                {items.map((item) => {
                  return (
                    <View key={item.value}>
                      <Pressable
                        onPress={() => {
                          setValue(item.value);
                        }}
                      >
                        <Avatar.Image
                          source={{
                            uri: item.value,
                          }}
                          size={80}
                          style={styles.avatarBackground}
                        />
                      </Pressable>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.text_footer}>
                {value ? `Picture selected` : null}
              </Text>
            </View>

            {/* submit button */}
            <LinearGradient
              colors={["#2F5D62", "#01ab9d"]}
              style={styles.signIn}
            >
              <TouchableOpacity onPress={updateUser}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Create Profile
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#DFEEEA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: "100%",
  },
  text_header: {
    flexDirection: "row",
    justifyContent: "center",
    color: "#DFEEEA",
    fontSize: 50,
    fontWeight: "bold",
    flex: 1,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowColor: "#22577E",
    textShadowRadius: 7,
    textAlign: "center",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 16,
    paddingTop: 16,
    padding: 16,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    fontSize: 16,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 300,
  },
  avatarBackground: {
    backgroundColor: "#DFEEEA",
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
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        navigation.navigate("App");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const { colors } = useTheme();

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <LinearGradient
          colors={["#2F5D62", "#01ab9d"]}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.text_header}>Our House</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text_footer}>Email </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                style={styles.textInput}
                placeholder="Please enter your Email"
                autoFocus
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <Text style={[styles.text_footer, { marginTop: 60 }]}>
              Password
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color={colors.text} size={20} />
              <TextInput
                style={styles.textInput}
                placeholder="Please enter your Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.button}>
              <LinearGradient
                colors={["#2F5D62", "#01ab9d"]}
                style={styles.signIn}
              >
                <TouchableOpacity onPress={signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <Text style={styles.registerMessage}>Don't have an account?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
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
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 100 }} />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },

  text_header: {
    flexDirection: "row",
    justifyContent: "center",
    color: "#DFEEEA",
    fontWeight: "bold",
    fontSize: 50,
    flex: 3,
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
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
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
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
    alignItems: "center",
    justifyContent: "center",
  },
  registerMessage: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

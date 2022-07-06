import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  Dimensions,
  Platform,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <LinearGradient colors={["#2F5D62", "#01ab9d"]} style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require("../../assets/mainLogo2.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Our House</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <LinearGradient colors={["#2F5D62", "#01ab9d"]} style={styles.signIn}>
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: "#DFEEEA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "black",
    fontSize: 25,
    flex: 1,
  },

  subtitle: {
    flexDirection: "row",
    justifyContent: "center",
    color: "black",
    fontSize: 60,
    fontWeight: "bold",
    flex: 6,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
    textShadowColor: "#22577E",
    textShadowRadius: 7,
    textAlign: "center",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
    flex: 2,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
});

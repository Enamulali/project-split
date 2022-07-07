import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;

const Messages = [
  {
    id: "1",
    userName: "Gugz Binning",
    userImg: require("../../assets/users/fruit3.png"),
    messageTime: "10 mins ago",
    messageText:
      "Hello everyone, does anyone want to swap a chore or shall i assign it to one of you at random!??",
  },
  {
    id: "2",
    userName: "Musa Issa",
    userImg: require("../../assets/users/fruit2.png"),
    messageTime: "5 hours ago",
    messageText: "Heeyyy Mate! I have just done the washing up....",
  },
  {
    id: "3",
    userName: "Enamul Ali",
    userImg: require("../../assets/users/fruit1.png"),
    messageTime: "20 hours ago",
    messageText: "I hate doing the laundry guys!",
  },
  {
    id: "4",
    userName: "Karly Holloway",
    userImg: require("../../assets/users/fruit4.png"),
    messageTime: "1 day ago",
    messageText: "I have the most points this week!!!",
  },
  {
    id: "5",
    userName: "Kieran Joyce",
    userImg: require("../../assets/users/fruit5.png"),
    messageTime: "2 days ago",
    messageText: "This is boring, get me outta here!!",
  },
];

const Msg = ({ navigation }) => {
  return (
    <Container style={styles.bg_colour}>
      <View style={styles.bg_colour}>
        <Text style={styles.heading}>Household Chat Room</Text>
      </View>
      <View style={styles.infoCard}>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate("Chat", { userName: item.userName })
              }
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </View>
    </Container>
  );
};

export default Msg;

const styles = StyleSheet.create({
  bg_colour: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 150,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
  banner: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2F5D62",
    height: 125,
    alignItems: "center",
  },
});

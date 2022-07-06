import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
  font-family: "Lato-Regular";
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: "Lato-Regular";
`;

const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;

const Messages = [
  {
    id: "1",
    userName: "Gugandeep Binning",
    userImg: require("../../assets/users/fruit1.png"),
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
    userImg: require("../../assets/users/fruit3.png"),
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
    <Container>
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
    </Container>
  );
};

export default Msg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

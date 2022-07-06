import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: [2, 3, 4, 5],
          username: "Gugz",
          avatar:
            "https://cdn-icons.flaticon.com/png/128/1791/premium/1791364.png?token=exp=1657070624~hmac=cc292d9f98a4222bb80940d7c37cc5e7",
        },
      },

      {
        _id: 2,
        text: "Hi mate",
        createdAt: new Date(),
        user: {
          _id: [1, 3, 4, 5],
          username: "Karly",
          avatar: "https://cdn-icons-png.flaticon.com/128/3076/3076104.png",
        },
      },

      {
        _id: 3,
        text: "Yo",
        createdAt: new Date(),
        user: {
          _id: [1, 2, 4, 5],
          username: "Musa",
          avatar:
            "https://cdn-icons.flaticon.com/png/128/3137/premium/3137034.png?token=exp=1657070624~hmac=468f32ee6a443ad9477c9ba048177baa",
        },
      },

      {
        _id: 4,
        text: "good morning",
        createdAt: new Date(),
        user: {
          _id: [1, 2, 3, 5],
          username: "Kieran",
          avatar: "https://cdn-icons-png.flaticon.com/128/590/590685.png",
        },
      },

      {
        _id: 5,
        text: "good night",
        createdAt: new Date(),
        user: {
          _id: [1, 2, 3, 4],
          username: "Enam",
          avatar:
            "https://cdn-icons.flaticon.com/png/128/3137/premium/3137034.png?token=exp=1657070624~hmac=468f32ee6a443ad9477c9ba048177baa",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#5E8B7E",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

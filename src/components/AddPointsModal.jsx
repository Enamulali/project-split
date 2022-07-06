import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const AddPointsModal = ({
  setPointsModalVisible,
  pointsModalVisible,
  chore,
  checked,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pointsModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPointsModalVisible(!pointsModalVisible);
        }}
      >
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              You've just earnt {chore.difficulty * 4} points!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPointsModalVisible(!pointsModalVisible)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddPointsModal;

const styles = StyleSheet.create({
  centered: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    elevation: 2,
    width: 64,
  },
  buttonClose: {
    backgroundColor: "#2F5D62",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 16,
  },
});

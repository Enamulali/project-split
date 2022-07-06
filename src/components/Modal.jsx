import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { deleteChore } from "../utils/api";

const ChoreModal = ({
  modalVisible,
  setModalVisible,
  chore,
  householdChores,
  setHouseholdChores,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dueDate = chore.due_date.toDate().toDateString();

  const handleConfirmation = () => {
    setConfirmDelete(true);
  };

  const handleDelete = () => {
    const filterChores = householdChores.filter((deleteChore) => {
      return deleteChore.chore_id !== chore.chore_id;
    });
    setHouseholdChores(filterChores);
    setModalVisible(!modalVisible);
    setIsDeleting(true);
    deleteChore(chore.chore_id).catch((err) => {
      setIsDeleting(false);
      setErr("Something went wrong!");
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{chore.chore_name}</Text>
            <Text style={styles.modalText}>{chore.description}</Text>
            <Text style={styles.modalText}>
              Assigned to {chore.user_assigned} points
            </Text>
            <Text style={styles.modalText}>Due on {dueDate}</Text>

            <View style={styles.buttonContainer}>
              <View style={styles.threeButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleConfirmation}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  // onPress={() => deleteChore()}
                >
                  <Text style={styles.textStyle}>Swap</Text>
                </Pressable>
              </View>

              {confirmDelete ? (
                <View style={styles.confirmButton}>
                  <Text style={{ padding: 16 }}>Are you sure?</Text>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      { width: 64, margin: "auto" },
                    ]}
                    onPress={() => handleDelete()}
                    disabled={isDeleting}
                  >
                    <Text style={styles.textStyle}>Yes</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChoreModal;

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
  buttonContainer: {
    flexDirection: "column",
  },
  threeButtons: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2F5D62",
  },
  confirmButton: {
    flex: 3,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  modalText: {
    margin: 8,
    textAlign: "center",
  },
});

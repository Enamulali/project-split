import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Checkbox, List, Pressable } from "react-native-paper";
import { patchChoreIsCompleted, patchUserPoints } from "../utils/api";
import ChoreModal from "../components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPointsModal from "../components/AddPointsModal";

const ChoreCard = ({ chore, householdChores, setHouseholdChores }) => {
  const [checked, setChecked] = React.useState(chore.is_completed);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pointsModalVisible, setPointsModalVisible] = React.useState(false);
  const userId = React.useContext(CurrentUserContext);

  const handleCheckbox = () => {
    setChecked(!checked);
    patchChoreIsCompleted(chore.chore_id, checked);
    patchUserPoints(userId.uid, chore.difficulty);
    setPointsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.page}>
      {checked ? (
        <AddPointsModal
          pointsModalVisible={pointsModalVisible}
          setPointsModalVisible={setPointsModalVisible}
          chore={chore}
          checked={checked}
        />
      ) : null}
      <ChoreModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chore={chore}
        householdChores={householdChores}
        setHouseholdChores={setHouseholdChores}
      />
      <View style={styles.container}>
        <Card style={styles.choreCard}>
          <Card.Content style={{ padding: 0 }}>
            <List.Item
              title={chore.chore_name}
              description={chore.description}
              left={(props) => (
                <View style={styles.checkbox}>
                  <Checkbox
                    status={checked ? "checked" : "unchecked"}
                    onPress={handleCheckbox}
                    style={styles.checkbox}
                  />
                </View>
              )}
              style={{ paddingHorizontal: 16, margin: 0 }}
              right={(props) => (
                <View style={styles.buttonView}>
                  <Button
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text>INFO</Text>
                  </Button>
                </View>
              )}
            />
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default ChoreCard;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginHorizontal: 18,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  choreCard: {
    width: "100%", //p and m 0 - no difference
    borderRadius: 10,
    marginBottom: -80, //remove for web (ios workaround)
  },
  checkbox: {
    backgroundColor: "#DFEEEA",
    borderRadius: 10,
    maxHeight: 32,
    maxWidth: 32,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
});

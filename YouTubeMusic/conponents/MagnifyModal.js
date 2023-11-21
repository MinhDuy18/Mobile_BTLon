import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const YourPage = ({ visible, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="arrow-back-outline" size={26} color="white" />
              </TouchableOpacity>
              <TextInput
                placeholder="Tìm bài hát, nghệ sĩ,pod..."
                placeholderTextColor={"grey"}
                style={{
                  width: "80%",
                  height: 36,
                  borderRadius: 20,
                  backgroundColor: "#222222",
                  paddingLeft: 10,
                  fontSize: 20,
                }}
              ></TextInput>
              <TouchableOpacity>
                <FontAwesome name="microphone" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 18,
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  closeButton: {
    marginTop: 10,
    color: "red",
  },
});

export default YourPage;

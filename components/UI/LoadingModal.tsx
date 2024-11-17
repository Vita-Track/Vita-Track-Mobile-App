import React from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  visible,
  message = "Loading, please wait...",
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LottieView
            source={{
              uri: "https://lottie.host/fa7b2edc-eed8-4e81-9a9b-b17f712dde45/chs11PbWFV.json",
            }}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 200,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  animation: {
    width: 100,
    height: 100,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default LoadingModal;

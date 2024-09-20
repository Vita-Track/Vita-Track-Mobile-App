import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from "react-native";

interface AuthOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  authMode: "login" | "register";
}

const AuthOptionsModal: React.FC<AuthOptionsModalProps> = ({
  visible,
  onClose,
  navigation,
  authMode,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.modalTitle}>
            {authMode === "login" ? "Log in" : "Register"} Options
          </Text>

          <Image
            source={require("../../assets/illustrations/onboarding.png")}
            style={{ width: 300, height: 300, alignSelf: "center" }}
          />
          <Pressable
            style={styles.btn}
            onPress={() => {
              if (authMode === "login") {
                navigation.navigate("Login");
                onClose();
              } else {
                navigation.navigate("Doctor Registration");
                onClose();
              }
            }}
          >
            <Text style={styles.btnTxt}>
              {authMode === "login" ? "Log in" : "Register"} as Doctor
            </Text>
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate(authMode, { role: "patient" })}
          >
            <Text style={styles.btnTxt}>
              {authMode === "login" ? "Log in" : "Register"} as Patient
            </Text>
          </Pressable>
          <View style={styles.closeBtnView}>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.btnTxt}>Close</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    display: "flex",
    height: "90%",
    backgroundColor: "#B2D8D8",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#008080",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  closeBtnView: {
    display: "flex",
    marginTop: "auto",
    marginBottom: 20,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  closeBtn: {
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

export default AuthOptionsModal;

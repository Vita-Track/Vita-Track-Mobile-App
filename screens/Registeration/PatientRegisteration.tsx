import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const PatientRegisteration: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    navigation.navigate("Patient Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patient Registeration</Text>
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={(value) => handleInputChange("dateOfBirth", value)}
        style={styles.input}
        mode="outlined"
      />
      <View style={styles.btnContainer}>
        <Pressable style={styles.btns} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Register</Text>
        </Pressable>
        <Pressable
          style={styles.btns}
          onPress={() => {
            navigation.navigate("Landing");
          }}
        >
          <Text style={styles.btnTxt}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#B2D8D8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  stepIndicator: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#008080",
    bottom: 0,
    marginBottom: 25,
    alignSelf: "center",
  },
  input: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btns: {
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#008080",
    borderRadius: 5,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default PatientRegisteration;

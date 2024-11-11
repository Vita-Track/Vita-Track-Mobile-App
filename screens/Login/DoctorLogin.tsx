import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import useApi from "../../hooks/useApi";
import { jwtDecode } from "jwt-decode";

const DoctorLogin: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = useApi().loginDoctor;
  const validateForm = () => {
    const newErrors: any = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = () => {
    if (!validateForm()) {
      alert("Please fill all the fields");
    } else {
      loginHandler({
        email,
        password,
      }).then((res) => {
        const decode = jwtDecode(res?.token);
        console.log(decode);
        navigation.navigate("Doctor Dashboard");
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Doctor Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <View style={styles.btnContainer}>
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("Landing")}
          style={styles.linkButton}
        >
          Back
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    backgroundColor: "#008080",
    marginBottom: 10,
  },
  linkButton: {
    width: "90%",
    justifyContent: "center",
  },
});

export default DoctorLogin;

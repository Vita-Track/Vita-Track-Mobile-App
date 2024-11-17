import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import useApi from "../../hooks/useApi";
import { jwtDecode } from "jwt-decode";
import LoadingModal from "../../components/UI/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientLogin: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginHandler = useApi().loginPatient;
  const validateForm = () => {
    const newErrors: any = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateForm()) {
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      const data = {
        email: email.toLocaleLowerCase(),
        password,
      };
      await loginHandler(data).then(async (res: any) => {
        setLoading(false);
        const decode = jwtDecode(res?.data.token);
        await AsyncStorage.setItem("decodedPatient", JSON.stringify(decode));
        console.log(await AsyncStorage.getItem("decodedPatient"));
        navigation.navigate("Patient Dashboard");
      });
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>

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
        <LoadingModal visible={loading} message="Logging In.." />
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
    borderRadius: 5,
  },
  linkButton: {
    width: "90%",
    justifyContent: "center",
  },
});

export default PatientLogin;

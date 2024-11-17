import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import useApi from "../../hooks/useApi";
import LoadingModal from "../../components/UI/LoadingModal";

const PatientRegistration: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const registerHandler = useApi().registerPatient;

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be 10 digits";
    }

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLocaleLowerCase(),
        phone: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
      };
      console.log(data);

      await registerHandler(data).then((res: any) => {
        if (res?.data?.message === "Patient registered successfully") {
          setLoading(false);
          navigation.navigate("patient-login");
        }
        setLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: "",
          password: "",
        });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Patient Registration</Text>

      <TextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
        style={styles.input}
        mode="outlined"
        error={!!errors.firstName}
      />
      {errors.firstName ? (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      ) : null}

      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        style={styles.input}
        mode="outlined"
        error={!!errors.lastName}
      />
      {errors.lastName ? (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      ) : null}

      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        error={!!errors.email}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        error={!!errors.password}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        error={!!errors.phoneNumber}
      />
      {errors.phoneNumber ? (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      ) : null}

      <TextInput
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={(value) => handleInputChange("dateOfBirth", value)}
        style={styles.input}
        mode="outlined"
        placeholder="YYYY-MM-DD"
        error={!!errors.dateOfBirth}
      />
      {errors.dateOfBirth ? (
        <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
      ) : null}

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
        <LoadingModal visible={loading} message="Registering..." />
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default PatientRegistration;

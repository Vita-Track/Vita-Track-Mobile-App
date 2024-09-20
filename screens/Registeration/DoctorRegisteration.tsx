import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorRegistration: React.FC = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    qualification: "",
    experienceYears: "",
    licenseNumber: "",
    clinicLocation: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
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
              label="Gender"
              value={formData.gender}
              onChangeText={(value) => handleInputChange("gender", value)}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange("dateOfBirth", value)}
              style={styles.input}
              mode="outlined"
              placeholder="YYYY-MM-DD"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
            />
            <TextInput
              label="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
            />
            <TextInput
              label="Clinic Location"
              value={formData.clinicLocation}
              onChangeText={(value) =>
                handleInputChange("clinicLocation", value)
              }
              style={styles.input}
              mode="outlined"
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              label="Specialization"
              value={formData.specialization}
              onChangeText={(value) =>
                handleInputChange("specialization", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Qualification"
              value={formData.qualification}
              onChangeText={(value) =>
                handleInputChange("qualification", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Years of Experience"
              value={formData.experienceYears}
              onChangeText={(value) =>
                handleInputChange("experienceYears", value)
              }
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
            />
            <TextInput
              label="License Number"
              value={formData.licenseNumber}
              onChangeText={(value) =>
                handleInputChange("licenseNumber", value)
              }
              style={styles.input}
              mode="outlined"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {step === 1
          ? "Personal Information"
          : step === 2
          ? "Contact Information"
          : "Professional Information"}
      </Text>

      {/* Progress Bar */}
      <ProgressBar
        progress={step / 3}
        color="#008080"
        style={styles.progressBar}
      />

      {/* Form Section */}
      {renderForm()}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <Button mode="contained" onPress={prevStep} style={styles.button}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button mode="contained" onPress={nextStep} style={styles.button}>
            Next
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => alert("Form Submitted")}
            style={styles.button}
          >
            Submit
          </Button>
        )}
      </View>
      <Text style={styles.stepIndicator}>Step {step} of 3</Text>
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "45%",
  },
});

export default DoctorRegistration;

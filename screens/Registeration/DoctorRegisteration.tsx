import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useApi from "../../hooks/useApi";

const DoctorRegistration: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<any>({});
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
  const registerHandler = useApi().registerDoctor;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    } else if (step === 2) {
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

      if (!formData.clinicLocation)
        newErrors.clinicLocation = "Clinic location is required";
    } else if (step === 3) {
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required";
      if (!formData.qualification)
        newErrors.qualification = "Qualification is required";

      if (!formData.experienceYears) {
        newErrors.experienceYears = "Experience is required";
      } else if (isNaN(Number(formData.experienceYears))) {
        newErrors.experienceYears = "Experience must be a number";
      }

      if (!formData.licenseNumber)
        newErrors.licenseNumber = "License number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
      // registerHandler(formData)
      //   .then(() => {
      //     console.log("Doctor registered successfully");
      //     navigation.navigate("Doctor Dashboard");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setErrors({ ...errors, server: "An error occurred" });
      //     setFormData({
      //       firstName: "",
      //       lastName: "",
      //       gender: "",
      //       dateOfBirth: "",
      //       email: "",
      //       phoneNumber: "",
      //       specialization: "",
      //       qualification: "",
      //       experienceYears: "",
      //       licenseNumber: "",
      //       clinicLocation: "",
      //     });
      //     setStep(1);
      //   });
      navigation.navigate("Doctor Dashboard");
    }
  };

  const nextStep = () => {
    if (validateForm()) setStep((prev) => prev + 1);
  };

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
              error={!!errors.firstName}
            />
            {errors.firstName ? (
              <Text style={styles.error}>{errors.firstName}</Text>
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
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}
            <TextInput
              label="Gender"
              value={formData.gender}
              onChangeText={(value) => handleInputChange("gender", value)}
              style={styles.input}
              mode="outlined"
              error={!!errors.gender}
            />
            {errors.gender ? (
              <Text style={styles.error}>{errors.gender}</Text>
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
              <Text style={styles.error}>{errors.dateOfBirth}</Text>
            ) : null}
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
              error={!!errors.email}
            />
            {errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
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
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            ) : null}
            <TextInput
              label="Clinic Location"
              value={formData.clinicLocation}
              onChangeText={(value) =>
                handleInputChange("clinicLocation", value)
              }
              style={styles.input}
              mode="outlined"
              error={!!errors.clinicLocation}
            />
            {errors.clinicLocation ? (
              <Text style={styles.error}>{errors.clinicLocation}</Text>
            ) : null}
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
              error={!!errors.specialization}
            />
            {errors.specialization ? (
              <Text style={styles.error}>{errors.specialization}</Text>
            ) : null}
            <TextInput
              label="Qualification"
              value={formData.qualification}
              onChangeText={(value) =>
                handleInputChange("qualification", value)
              }
              style={styles.input}
              mode="outlined"
              error={!!errors.qualification}
            />
            {errors.qualification ? (
              <Text style={styles.error}>{errors.qualification}</Text>
            ) : null}
            <TextInput
              label="Years of Experience"
              value={formData.experienceYears}
              onChangeText={(value) =>
                handleInputChange("experienceYears", value)
              }
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              error={!!errors.experienceYears}
            />
            {errors.experienceYears ? (
              <Text style={styles.error}>{errors.experienceYears}</Text>
            ) : null}
            <TextInput
              label="License Number"
              value={formData.licenseNumber}
              onChangeText={(value) =>
                handleInputChange("licenseNumber", value)
              }
              style={styles.input}
              mode="outlined"
              error={!!errors.licenseNumber}
            />
            {errors.licenseNumber ? (
              <Text style={styles.error}>{errors.licenseNumber}</Text>
            ) : null}
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

      <ProgressBar
        progress={step / 3}
        color="#008080"
        style={styles.progressBar}
      />

      {renderForm()}

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
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
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
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#008080",
  },
  stepIndicator: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorRegistration;

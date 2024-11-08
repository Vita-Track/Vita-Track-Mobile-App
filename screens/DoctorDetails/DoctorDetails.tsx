import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { DummyDoctors } from "../../data";

const DoctorDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { doctorId } = route.params;
  const doctor: Doctor | undefined = DummyDoctors.find(
    (doc) => doc.id === doctorId
  );

  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={styles.name}
        >{`${doctor.firstName} ${doctor.lastName}`}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.detail}>
          Clinic Location: {doctor.clinicLocation}
        </Text>
        <Text style={styles.detail}>Email: {doctor.email}</Text>
        <Text style={styles.detail}>
          Age:{" "}
          {new Date().getFullYear() -
            new Date(doctor.dateOfBirth).getFullYear()}
        </Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Day</Text>
          <RNPickerSelect
            onValueChange={(value: any) => setSelectedDay(value)}
            items={days.map((day) => ({ label: day, value: day }))}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a day", value: undefined }}
          />
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Time</Text>
          <RNPickerSelect
            onValueChange={(value: any) => setSelectedTime(value)}
            items={times.map((time) => ({ label: time, value: time }))}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a time", value: undefined }}
          />
        </View>

        <Button
          onPress={() => {
            if (selectedDay && selectedTime) {
              // Add booking logic here
              alert(
                `Appointment booked with Dr. ${doctor.firstName} ${doctor.lastName} on ${selectedDay} at ${selectedTime}`
              );
              navigation.goBack();
            } else {
              alert("Please select both day and time.");
            }
          }}
          style={{
            backgroundColor: "#008080",
            borderRadius: 5,
            marginTop: 10,
          }}
          textColor="#fff"
        >
          Book Appointment
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  specialization: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  notFound: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "#333",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "#333",
    paddingRight: 30,
  },
});

export default DoctorDetails;

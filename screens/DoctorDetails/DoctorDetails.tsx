import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { addAppointment, getAllAppointments } from "../../firebase/database";
import useHelper from "../../hooks/useHelper";
import useApi from "../../hooks/useApi";

const DoctorDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [patientId, setPatientId] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<any[]>([]);
  const firebaseDbOps = getAllAppointments();
  useEffect(() => {
    const getAppointments = async () => {
      const receivedAppointments = await firebaseDbOps;
      setAppointments(receivedAppointments);
    };
    getAppointments();
  }, []);
  const { doctorId } = route.params;
  const helper = useHelper();
  const api = useApi();
  useEffect(() => {
    const getPatientId = async () => {
      const pId = await AsyncStorage.getItem("decodedPatient");
      console.log("PiD", JSON.parse(pId).Id);

      setPatientId(JSON.parse(pId).Id);
    };
    getPatientId();
  }, []);
  const allDoctors = useSelector((state: any) => state.data.doctors);

  const doctor: any = allDoctors.find((doc: any) => doc.id === doctorId);

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

  const days = [
    "Today",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
  const bookAppointment = async () => {
    if (!patientId) {
      alert("Patient ID not found. Please log in again.");
      return;
    }
    if (!selectedDay || !selectedTime) {
      alert("Please select both day and time.");
      return;
    }

    // Convert selected day and time to a proper date and time format
    const date = new Date();
    const dayIndex = days.indexOf(selectedDay);
    const today = new Date().getDay();

    const deltaDays = (dayIndex + 1 + 7 - today) % 7;
    date.setDate(date.getDate() + deltaDays);

    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = selectedTime;
    const hasConflict = helper.conflictChecker(
      appointments,
      formattedDate,
      formattedTime,
      doctorId
    );

    if (hasConflict) {
      alert(
        `Conflict detected: Dr. ${doctor.firstName} ${doctor.lastName} already has an appointment on ${formattedDate} at ${formattedTime}.`
      );
      return;
    }
    const appointment = {
      doctorId,
      patientId,
      date: formattedDate,
      time: formattedTime,
      status: "booked",
    };

    try {
      const appointmentId = helper.generateAppointmentId(
        doctorId,
        patientId,
        formattedTime
      );
      // console.log("Appointment ID", appointmentId);

      await addAppointment(appointmentId, appointment);
      await api.associateDoctor(doctorId, patientId);
      alert(
        `Appointment booked with Dr. ${doctor.firstName} ${doctor.lastName} on ${formattedDate} at ${formattedTime}`
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={styles.name}
        >{`${doctor.firstName} ${doctor.lastName}`}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.detail}>
          Clinic Location: {doctor.clinicAddress}
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
            onValueChange={(value: any) => {
              if (value === "Today") {
                let today = new Date().getDay().toLocaleString();
                setSelectedDay(today);
                console.log("Today", today);

                return;
              }
              setSelectedDay(value);
            }}
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
          onPress={bookAppointment}
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

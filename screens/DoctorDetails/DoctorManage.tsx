import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHelper from "../../hooks/useHelper";
import { useSelector } from "react-redux";
import { getAllAppointments } from "../../firebase/database";

const DoctorManage: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { doctorId } = route.params;
  console.log("Doctor ID", doctorId);

  const [doctor, setDoctor] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const doctors = useSelector((state: any) => state.data.doctors);
  const helper = useHelper();
  const firebaseDbOP = getAllAppointments();
  useEffect(() => {
    const getAppointments = async () => {
      const patient = await AsyncStorage.getItem("decodedPatient");
      setPatient(JSON.parse(patient));
      const selectedDoctor = helper.findDoctorFromId(doctors, doctorId);
      setDoctor(selectedDoctor);
      const receivedAppointments = await firebaseDbOP;
      const docsAppointments = helper.getAppointmentsByDoctorId(
        receivedAppointments,
        doctorId
      );
      console.log("Doctor Appointments", docsAppointments);

      setAppointments(docsAppointments);
    };

    getAppointments();
  }, [doctorId]);

  return (
    <SafeAreaView style={styles.container}>
      {doctor ? (
        <ScrollView>
          <Text style={styles.heading}>
            Dr. {doctor.firstName} {doctor.lastName}
          </Text>
          <Text style={styles.subHeading}>Specialization</Text>
          <Text style={styles.detailText}>{doctor.specialization}</Text>
          <Text style={styles.subHeading}>Appointments</Text>
          {appointments.length > 0 ? (
            appointments
              .filter((appts: any) => {
                return appts.patientId === patient.Id;
              })
              .map((appointment, index) => (
                <View key={index} style={styles.appointmentCard}>
                  <Text style={styles.appointmentText}>
                    {appointment.date} at {appointment.time}
                  </Text>
                </View>
              ))
          ) : (
            <Text>No appointments with this doctor yet.</Text>
          )}
          <Button
            style={styles.backButton}
            mode="contained"
            onPress={() => navigation.goBack()}
          >
            Back to Doctors List
          </Button>
        </ScrollView>
      ) : (
        <Text>Loading doctor details...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f7", margin: 10 },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#008080",
    marginTop: 10,
  },
  detailText: { fontSize: 18, color: "#555", marginVertical: 5 },
  appointmentCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
  },
  appointmentText: { fontSize: 16, color: "#333" },
  backButton: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default DoctorManage;

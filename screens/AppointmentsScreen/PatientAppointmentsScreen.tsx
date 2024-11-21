import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AppointmentBar from "../../components/UI/AppointmentBar";
import useHelper from "../../hooks/useHelper";
import { useSelector } from "react-redux";
import { getAllAppointments } from "../../firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientAppointmentsScreen = () => {
  const helper = useHelper();
  const dotors = useSelector((state: any) => state.data.doctors);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patient, setPatient] = useState<any | undefined>(undefined);

  const firebaseDbOps = getAllAppointments();
  useEffect(() => {
    const getPatient = async () => {
      const p = await AsyncStorage.getItem("decodedPatient");
      setPatient(JSON.parse(p));
    };

    getPatient();
  }, []);

  useEffect(() => {
    const getAppointments = async () => {
      const recieveAppointments = await firebaseDbOps;
      const currentPatientsAppointments = helper.getAppointmentsByPatientId(
        recieveAppointments,
        patient?.Id
      );
      setAppointments(currentPatientsAppointments);
    };
    getAppointments();
  }, [patient]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>All of your upcoming appointments.</Text>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => {
            let doctor = helper.findDoctorFromId(dotors, appointment.doctorId);
            return (
              <AppointmentBar
                key={index}
                doctorName={`${doctor?.firstName} ${doctor?.lastName}`}
                time={appointment.time}
                date={appointment.date}
                showDate
              />
            );
          })
        ) : (
          <Text style={styles.noAppointments}>
            You currently have no appointments.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f4f7",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 10,
  },
  noAppointments: {
    color: "#888",
    fontStyle: "italic",
    paddingVertical: 5,
  },
});

export default PatientAppointmentsScreen;

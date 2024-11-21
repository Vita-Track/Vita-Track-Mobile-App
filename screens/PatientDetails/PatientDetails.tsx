import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import useHelper from "../../hooks/useHelper";
import AppointmentBar from "../../components/UI/AppointmentBar";
import { getAllAppointments } from "../../firebase/database";

const PatientDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { patientId } = route.params;

  const [patient, setPatient] = useState<any>();

  const [patientAppointments, setPatientAppointments] = useState<any[]>([]);

  const patients = useSelector((state: any) => state.data.patients);
  const helper = useHelper();
  const firebaseDbOP = getAllAppointments();

  useEffect(() => {
    const getAppointments = async () => {
      const selectedPatient = helper.findPatientFromId(patients, patientId);
      setPatient(selectedPatient);
      const receivedAppointments = await firebaseDbOP;
      const docsAppointments = helper.getAppointmentsByPatientId(
        receivedAppointments,
        patient?.id
      );
      setPatientAppointments(docsAppointments);
    };
    getAppointments();
  }, [patientId]);

  //   console.log("select patients appointments", patientAppointments);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Patient Details</Text>
      <ScrollView>
        {patient ? (
          <View style={styles.content}>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {patient.firstName} {patient.lastName}
              </Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.value}>
                {new Date().getFullYear() -
                  new Date(patient.dateOfBirth).getFullYear()}
              </Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{patient.email}</Text>
            </View>

            <Text style={styles.subheading}>Appointments</Text>
            {patientAppointments.length > 0 ? (
              patientAppointments.map((appointment, index) => (
                <AppointmentBar
                  key={index}
                  time={appointment.time}
                  date={appointment.date}
                  showDate={true}
                />
              ))
            ) : (
              <Text style={styles.noAppointments}>
                No appointments available.
              </Text>
            )}
            <Button
              style={styles.healthRecordBtn}
              mode="contained"
              onPress={() => navigation.goBack()}
            >
              Add a health record
            </Button>
          </View>
        ) : (
          <Text style={styles.noDetails}>Patient details not found.</Text>
        )}
        <Button
          style={styles.backButton}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Back to Patients List
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f7", padding: 10 },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008080",
    marginTop: 15,
  },
  content: { padding: 10 },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontSize: 18, fontWeight: "bold", color: "#333" },
  value: { fontSize: 18, color: "#555" },
  noAppointments: {
    color: "#888",
    fontStyle: "italic",
    paddingVertical: 5,
    textAlign: "center",
  },
  noDetails: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#008080",
    marginTop: 20,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  healthRecordBtn: {
    backgroundColor: "#008080",
    marginTop: 20,
    borderRadius: 5,
  },
});

export default PatientDetails;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import useHelper from "../../hooks/useHelper";
import AppointmentBar from "../../components/UI/AppointmentBar";
import { getAllAppointments } from "../../firebase/database";
import LoadingModal from "../../components/UI/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { patientId } = route.params;

  const [patient, setPatient] = useState<any>();

  const [patientAppointments, setPatientAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const patients = useSelector((state: any) => state.data.patients);
  const helper = useHelper();
  const firebaseDbOP = getAllAppointments();

  useEffect(() => {
    const selectedPatient = helper.findPatientFromId(patients, patientId);
    setPatient(selectedPatient);
  }, []);

  useEffect(() => {
    const getDoctor = async () => {
      const d = await AsyncStorage.getItem("decodedDoctor");
      if (d) {
        const docData = JSON.parse(d);
        try {
          // Parse AssociatedDoctors if it's a string
          if (typeof docData.AssociatedPatients === "string") {
            docData.AssociatedPatients = JSON.parse(docData.AssociatedPatients);
          }
        } catch (error) {
          console.error("Error parsing AssociatedPatients", error);
          docData.AssociatedPatients = [];
        }
        setDoctor(docData);
      }
    };

    getDoctor();
    const getAppointments = async () => {
      setLoading(true);
      const receivedAppointments = await firebaseDbOP;
      const docsAppointments = helper.getAppointmentsByPatientId(
        receivedAppointments,
        patient?.id
      );

      setLoading(false);
      setPatientAppointments(docsAppointments);
    };
    getAppointments();
  }, [patients.length, patient]);

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
              patientAppointments
                .filter((app: any) => {
                  return app.doctorId === patient.id;
                })
                .map((appointment, index) => {
                  return (
                    <AppointmentBar
                      key={index}
                      time={appointment.time}
                      date={appointment.date}
                      showDate={true}
                    />
                  );
                })
            ) : (
              <Text style={styles.noAppointments}>
                No appointments available.
              </Text>
            )}
            <Button
              style={styles.healthRecordBtn}
              mode="contained"
              onPress={() =>
                navigation.navigate("upload-doctor-record-screen", {
                  patientId,
                })
              }
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
      <LoadingModal
        visible={loading}
        message="Fetching patient appointments..."
      />
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

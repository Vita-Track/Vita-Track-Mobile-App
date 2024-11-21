import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import SnackBar, { SnackBarContents } from "../../components/UI/SnackBar";
import { Link } from "@react-navigation/native";
import useHelper from "../../hooks/useHelper";
import { Button } from "react-native-paper";
import QuickAction, {
  IQuickActionProps,
} from "../../components/UI/QuickAction";
import { getAllAppointments } from "../../firebase/database";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentBar from "../../components/UI/AppointmentBar";
import PatientCard from "../../components/UI/PatientCard";

const DoctorDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctor, setDoctor] = useState<any>();
  const [dayPreviewAppointments, setDayPreviewAppointments] = useState<any[]>(
    []
  );

  const snackBarContents: Array<SnackBarContents> = [
    {
      icon: "calendar-clock",
      label: "Upcoming Appointments",
      route: "Appointments",
    },
    { icon: "clipboard", label: "Patient Records", route: "Records" },
    { icon: "account", label: "Profile", route: "Profile" },
    { icon: "logout", label: "Logout", route: "Landing" },
  ];

  const quickActions: Array<IQuickActionProps> = [
    {
      icon: "cancel",
      label: "Cancel Appointments for Today",
      onPress: () => console.log("Cancel Appointments"),
    },
    {
      icon: "clipboard",
      label: "Manage Patients",
      onPress: () => navigation.navigate("patients-list-screen"),
    },
    {
      icon: "chat",
      label: "Contact Support",
      onPress: () => console.log("Help"),
    },
  ];

  const helper = useHelper();
  const firebaseDbOps = getAllAppointments();
  const patients = useSelector((state: any) => state.data.patients);
  const today = new Date();

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
  }, []);

  useEffect(() => {
    const getAppointments = async () => {
      const receivedAppointments = await firebaseDbOps;
      const docsAppointments = helper.getAppointmentsByDoctorId(
        receivedAppointments,
        doctor?.Id
      );
      setAppointments(docsAppointments);
    };
    getAppointments();
  }, [doctor]);

  useEffect(() => {
    const appointmentsDayPreview = helper
      .getAppointmentsByDate(appointments, today)
      .slice(0, 3);
    setDayPreviewAppointments(appointmentsDayPreview);
  }, [appointments]);

  // useEffect(() => {
  //   const associatedPatientsList = helper.getPatientsByDoctorId(
  //     patients,
  //     doctor?.Id
  //   );
  //   setAssociatedPatients(associatedPatientsList);
  // }, [patients, doctor]);

  return (
    <SafeAreaView style={styles.doctorContainer}>
      <Text style={styles.doctorDashHeading}>
        Welcome, Dr. {doctor?.FirstName} {doctor?.LastName}
      </Text>
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.mainContentHeading}>Upcoming Appointments</Text>
            {dayPreviewAppointments.length > 0 ? (
              dayPreviewAppointments.map((appointment, index) => {
                let patient = helper.findPatientFromId(
                  patients,
                  appointment.patientId
                );
                return (
                  <AppointmentBar
                    key={index}
                    patientName={`${patient?.firstName} ${patient?.lastName}`}
                    showDate={false}
                    time={appointment.time}
                    date={appointment.date}
                  />
                );
              })
            ) : (
              <Text style={styles.noAppointments}>
                No appointments for today.
              </Text>
            )}

            <Button style={styles.ddashboardBtn} mode="contained">
              <Link to="/doctor-appointments-screen">
                View all appointments
              </Link>
            </Button>
          </View>
          {/* Associated Patients Section */}
          <View style={styles.section}>
            <Text style={styles.mainContentHeading}>Associated Patients</Text>
            {doctor?.AssociatedPatients?.length > 0 ? (
              doctor?.AssociatedPatients?.slice(0, 3).map(
                (pId: any, index: any) => {
                  let patient = helper.findPatientFromId(patients, pId);
                  let age =
                    new Date().getFullYear() -
                    new Date(patient.dateOfBirth).getFullYear();
                  return (
                    <PatientCard
                      key={index}
                      name={`${patient?.firstName} ${patient?.lastName}`}
                      onViewPatient={() =>
                        navigation.navigate("patient-details-screen", {
                          patientId: patient?.id,
                        })
                      }
                      age={age}
                    />
                  );
                }
              )
            ) : (
              <Text style={styles.noAppointments}>No associated patients.</Text>
            )}
            <Button style={styles.ddashboardBtn} mode="contained">
              <Link to="/patients-list-screen">View all patients</Link>
            </Button>
          </View>
          <Text style={styles.mainContentHeading}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <QuickAction
                key={index}
                icon={action.icon}
                label={action.label}
                onPress={action.onPress}
              />
            ))}
          </View>
          <Button style={styles.logoutBtn} mode="contained">
            <Link to="/Landing">Logout</Link>
          </Button>
        </View>
      </ScrollView>
      <View style={styles.footerArea}>
        <SnackBar contents={snackBarContents} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  doctorContainer: { flex: 1, backgroundColor: "#f0f4f7", padding: 10 },
  doctorDashHeading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
  },
  mainContent: { padding: 10, margin: 10 },
  mainContentHeading: { fontSize: 25, fontWeight: "bold", color: "#008080" },
  section: { marginBottom: 15 },
  quickActions: { flexDirection: "column", marginTop: 10 },
  ddashboardBtn: {
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
  },
  logoutBtn: {
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 70,
  },
  footerArea: { position: "absolute", width: "100%", bottom: 0 },
  noAppointments: { color: "#888", fontStyle: "italic", paddingVertical: 5 },
  patientItem: { fontSize: 18, marginVertical: 5, color: "#333" },
});

export default DoctorDashboard;

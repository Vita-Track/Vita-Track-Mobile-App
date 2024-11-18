import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import SnackBar, { SnackBarContents } from "../../components/UI/SnackBar";
import QuickAction, {
  IQuickActionProps,
} from "../../components/UI/QuickAction";
import React, { useEffect, useState } from "react";
import useHelper from "../../hooks/useHelper";
import { DummyAppointments, DummyDoctors } from "../../data";
import AppointmentBar from "../../components/UI/AppointmentBar";
import { Button } from "react-native-paper";
import DoctorCard from "../../components/UI/DoctorCard";
import { Link } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllAppointments } from "../../firebase/database";

const PatientDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [patient, setPatient] = useState<any | undefined>(undefined);
  const [doctorsOfPatients, setDoctorsOfPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const helper = useHelper();

  const snackBarContents: Array<SnackBarContents> = [
    {
      icon: "account-multiple",
      label: "Discover Doctors",
      route: "DiscoverDoctors",
    },
    {
      icon: "calendar-clock",
      label: "Manage Appointments",
      route: "ManageAppointments",
    },
    {
      icon: "file-document",
      label: "Health Records",
      route: "HealthRecords",
    },
    {
      icon: "logout",
      label: "Logout",
      route: "Landing",
    },
  ];
  const firebaseDbOps = getAllAppointments();
  useEffect(() => {
    const getAppointments = async () => {
      const recieveAppointments = await firebaseDbOps;
      setAppointments(recieveAppointments);
    };
    const getPatientId = async () => {
      const p = await AsyncStorage.getItem("decodedPatient");

      setPatient(JSON.parse(p));
    };
    getPatientId();
    getAppointments();

    setDoctorsOfPatients(getPatientsDoctors);
  }, []);

  useEffect(() => {
    const patientsAppointments = helper.getAppointmentsByPatientId(
      appointments,
      patient?.Id
    );

    setUpcomingAppointments(patientsAppointments);
  }, [appointments.length]);
  console.log("Upcoming Appointments", upcomingAppointments);

  const quickActions: Array<IQuickActionProps> = [
    {
      icon: "account-multiple",
      label: "Discover Doctors",
      onPress: () => navigation.navigate("explore-doctors-screen"),
    },
    {
      icon: "upload",
      label: "Upload Health Records",
      onPress: () => navigation.navigate("upload-health-records"),
    },
    {
      icon: "calendar",
      label: "Manage Appointments",
      onPress: () => navigation.navigate("manage-appointments-screen"),
    },
    {
      icon: "file-document",
      label: "View Health Records",
      onPress: () => navigation.navigate("view-health-records-screen"),
    },
    {
      icon: "chat",
      label: "Contact Support",
      onPress: () => console.log("Help"),
    },
  ];

  const doctors = DummyDoctors;

  const getPatientsDoctors = helper.getDoctorsByPatientId(doctors, "1");

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.patientContainer}>
      <Text style={styles.patientDashHeading}>
        Welcome {patient?.FirstName} {patient?.LastName}
      </Text>
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.mainContentHeading}>Upcoming Appointments</Text>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments
                .slice(0, 3)
                .map((appointment, index) => (
                  <AppointmentBar
                    key={index}
                    doctorName={
                      helper.findDoctorFromId(doctors, appointment.doctorId)
                        ?.firstName
                    }
                    showDate={true}
                    time={appointment.time}
                    date={appointment.date}
                  />
                ))
            ) : (
              <Text>No upcoming appointments</Text>
            )}
            <Button style={styles.viewAllBtn} mode="contained">
              <Text onPress={() => navigation.navigate("appointments-screen")}>
                View all appointments
              </Text>
            </Button>
          </View>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.mainContentHeading}>Your Doctors</Text>
            {doctorsOfPatients.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={`${doctor.firstName} ${doctor.lastName}`}
                specialization={doctor.specialization}
                onViewDoctor={() =>
                  navigation.navigate("doctor-details-screen", {
                    doctorId: doctor.id,
                  })
                }
              />
            ))}
            <Button style={styles.viewAllBtn} mode="contained">
              <Text
                onPress={() => navigation.navigate("health-records-screen")}
              >
                View all doctors
              </Text>
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

          <Button style={styles.viewAllBtn} mode="contained">
            <Link
              to="/Landing"
              onPress={async () => {
                await AsyncStorage.removeItem("decodedPatient");
              }}
            >
              Logout
            </Link>
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
  patientContainer: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 10,
    position: "relative",
  },
  patientDashHeading: {
    fontSize: 27,
    fontWeight: "black",
    color: "#008080",
    textAlign: "center",
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    marginBottom: 70,
  },
  mainContentHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "left",
  },
  viewAllBtn: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
  },
  quickActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  footerArea: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default PatientDashboard;

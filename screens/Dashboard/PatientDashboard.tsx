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

const PatientDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [doctorsOfPatients, setDoctorsOfPatients] = useState<any[]>([]);
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
      route: "Logout",
    },
  ];

  const quickActions: Array<IQuickActionProps> = [
    {
      icon: "account-multiple",
      label: "Discover Doctors",
      onPress: () => navigation.navigate("explore-doctors-screen"),
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
  const helper = useHelper();
  const appointments = DummyAppointments;
  const doctors = DummyDoctors;
  const patientsAppointments = helper.getAppointmentsByPatientId(
    appointments,
    "1"
  );

  const getPatientsDoctors = helper.getDoctorsByPatientId(doctors, "1");

  useEffect(() => {
    setUpcomingAppointments(patientsAppointments);
    setDoctorsOfPatients(getPatientsDoctors);
  }, []);

  return (
    <SafeAreaView style={styles.patientContainer}>
      <Text style={styles.patientDashHeading}>Welcome to Your Dashboard</Text>
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.mainContentHeading}>Upcoming Appointments</Text>
            {upcomingAppointments.slice(0, 3).map((appointment, index) => (
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
            ))}
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
    margin: 10,
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

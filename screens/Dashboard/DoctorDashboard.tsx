import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import SnackBar, { SnackBarContents } from "../../components/UI/SnackBar";
import { Link } from "@react-navigation/native";
import useHelper from "../../hooks/useHelper";
import { DummyAppointments, DummyDoctors, DummyPatients } from "../../data";
import React, { useEffect, useState } from "react";
import AppointmentBar from "../../components/UI/AppointmentBar";
import { Button } from "react-native-paper";
import QuickAction, {
  IQuickActionProps,
} from "../../components/UI/QuickAction";
const DoctorDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [dayPreviewAppointments, setDayPreviewAppointments] = useState<any[]>(
    []
  );
  const snackBarContents: Array<SnackBarContents> = [
    {
      icon: "calendar-clock",
      label: "Upcoming Appointments",
      route: "Appointments",
    },
    {
      icon: "clipboard",
      label: "Patient Records",
      route: "Records",
    },
    {
      icon: "account",
      label: "Profile",
      route: "Profile",
    },
    {
      icon: "logout",
      label: "Logout",
      route: "Logout",
    },
  ];
  const quickActions: Array<IQuickActionProps> = [
    {
      icon: "cancel",
      label: "Cancel Appointments for Today",
      onPress: () => console.log("Cancel Appointment for Today"),
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
  const appointments = DummyAppointments;
  const patients = DummyPatients;
  const doctor = DummyDoctors[0];
  const appointmentsDayPreview = helper
    .doctorsDayAppointmentsPreview(appointments, doctor.id)
    .slice(0, 3);

  const allTodaysAppointments = helper.doctorsDayAppointmentsPreview(
    appointments,
    doctor.id
  );
  useEffect(() => {
    setDayPreviewAppointments(appointmentsDayPreview);
  }, []);
  return (
    <SafeAreaView style={styles.doctorContainer}>
      <Text style={styles.doctorDashHeading}>Welcome, Dr. Adam Levin</Text>
      <ScrollView>
        <View style={styles.mainContent}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 2,
              marginBottom: 10,
            }}
          >
            <Text style={styles.mainContentHeading}>
              Today's Appointments at a Glance
            </Text>
            {dayPreviewAppointments.map((appointment, index) => {
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
            })}
            <Button style={styles.ddashboardBtn} mode="contained">
              <Link to="/appointments-screen">
                View all of today's appointments
              </Link>
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
  doctorContainer: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 10,
    position: "relative",
  },
  doctorDashHeading: {
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
  quickActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  ddashboardBtn: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
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

export default DoctorDashboard;

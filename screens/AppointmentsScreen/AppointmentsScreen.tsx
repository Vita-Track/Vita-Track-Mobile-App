import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AppointmentBar from "../../components/UI/AppointmentBar";
import useHelper from "../../hooks/useHelper";
import { useSelector } from "react-redux";
import { getAllAppointments } from "../../firebase/database";

const AppointmentsScreen = () => {
  const helper = useHelper();
  const today = new Date();
  const tomorrow = new Date(today);
  const dayAfterTomorrow = new Date(today);
  const patients = useSelector((state: any) => state.data.patients);
  const [appointments, setAppointments] = useState<any[]>([]);
  const firebaseDbOps = getAllAppointments();
  useEffect(() => {
    const getAppointments = async () => {
      const recieveAppointments = await firebaseDbOps;
      setAppointments(recieveAppointments);
    };
    getAppointments();
  }, []);

  tomorrow.setDate(today.getDate() + 1);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  // Filter appointments by each day
  const todayAppointments = helper.getAppointmentsByDate(appointments, today);
  const tomorrowAppointments = helper.getAppointmentsByDate(
    appointments,
    tomorrow
  );
  const dayAfterTomorrowAppointments = helper.getAppointmentsByDate(
    appointments,
    dayAfterTomorrow
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Today</Text>
        {todayAppointments.length > 0 ? (
          todayAppointments.map((appointment, index) => {
            let patient = helper.findPatientFromId(
              patients,
              appointment.patientId
            );
            return (
              <AppointmentBar
                key={index}
                patientName={`${patient?.firstName} ${patient?.lastName}`}
                time={appointment.time}
                date={appointment.date}
              />
            );
          })
        ) : (
          <Text style={styles.noAppointments}>No appointments for today.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Tomorrow</Text>
        {tomorrowAppointments.length > 0 ? (
          tomorrowAppointments.map((appointment, index) => {
            let patient = helper.findPatientFromId(
              patients,
              appointment.patientId
            );
            return (
              <AppointmentBar
                key={index}
                patientName={`${patient?.firstName} ${patient?.lastName}`}
                time={appointment.time}
                date={appointment.date}
              />
            );
          })
        ) : (
          <Text style={styles.noAppointments}>
            No appointments for tomorrow.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>
          {dayAfterTomorrow.toLocaleDateString()}
        </Text>
        {dayAfterTomorrowAppointments.length > 0 ? (
          dayAfterTomorrowAppointments.map((appointment, index) => {
            let patient = helper.findPatientFromId(
              patients,
              appointment.patientId
            );
            return (
              <AppointmentBar
                key={index}
                patientName={`${patient?.firstName} ${patient?.lastName}`}
                time={appointment.time}
                date={appointment.date}
              />
            );
          })
        ) : (
          <Text style={styles.noAppointments}>
            No appointments for this day.
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

export default AppointmentsScreen;

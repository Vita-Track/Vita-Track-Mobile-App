import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";

interface IAppointmentBarProps {
  patientName?: string;
  doctorName?: string;
  time: string;
  date: string;
  showDate?: boolean;
}

const AppointmentBar: React.FC<IAppointmentBarProps> = (props) => {
  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month}, ${year}`;
  };

  return (
    <View style={styles.appointmentBar}>
      <View style={styles.leftSection}>
        {props.doctorName && (
          <Text style={styles.name}>Dr. {props.doctorName}</Text>
        )}
        {props.patientName && (
          <Text style={styles.name}>{props.patientName}</Text>
        )}
        {props.showDate && (
          <Text style={styles.date}>{formatDate(props.date)}</Text>
        )}
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.time}>{props.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#008080",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
    flexDirection: "column",
  },
  rightSection: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 16,
    color: "#f0f0f0",
    marginTop: 5,
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AppointmentBar;

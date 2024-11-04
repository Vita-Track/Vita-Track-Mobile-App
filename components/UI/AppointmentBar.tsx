import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-paper";

interface IAppointmentBarProps {
  patientName: string;
  time: string;
  date: string;
  showDate?: boolean;
}
const AppointmentBar: React.FC<IAppointmentBarProps> = (props) => {
  return (
    <SafeAreaView style={styles.appointmentBar}>
      <Text style={styles.patientName}>{props.patientName}</Text>
      <Text style={styles.time}>{props.time}</Text>
      {props.showDate && <Text style={styles.date}>{props.date}</Text>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appointmentBar: {
    display: "flex",
    width: "100%",
    height: 70,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#008080",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default AppointmentBar;

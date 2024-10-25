import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import SnackBar, { SnackBarContents } from "../../components/UI/SnackBar";
const DoctorDashboard = () => {
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
  ];
  return (
    <SafeAreaView style={styles.doctorContainer}>
      <Text style={styles.doctorDashHeading}>Welcome, Dr. Adam Levin</Text>
      <View style={styles.footerArea}>
        <SnackBar contents={snackBarContents} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  doctorContainer: {
    flex: 1,
    backgroundColor: "#B2D8D8",
    padding: 10,
    position: "relative",
  },
  doctorDashHeading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
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

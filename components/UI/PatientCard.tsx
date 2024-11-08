import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";

interface IPatientCardProps {
  patientName: string;
  onManagePress: () => void;
}

const PatientCard: React.FC<IPatientCardProps> = ({
  patientName,
  onManagePress,
}) => {
  return (
    <SafeAreaView style={styles.patientCard}>
      <Text style={styles.patientName}>{patientName}</Text>
      <IconButton
        icon="account-cog"
        size={24}
        onPress={onManagePress}
        style={styles.manageButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  patientCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    backgroundColor: "#008080",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
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
  },
  manageButton: {
    backgroundColor: "transparent",
  },
});

export default PatientCard;

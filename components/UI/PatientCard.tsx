import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

interface PatientCardProps {
  name?: string;
  age?: number;
  onViewPatient?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  name,
  age,
  onViewPatient,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.age}>Age: {age}</Text>
      <Button onPress={onViewPatient} style={styles.patientBtn}>
        View Patient
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#4CAF50", // Change color to differentiate from doctor
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  age: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 4,
  },
  patientBtn: {
    backgroundColor: "#fff",
    color: "#4CAF50", // Matching color for the button
    borderRadius: 5,
    marginTop: 10,
  },
});

export default PatientCard;

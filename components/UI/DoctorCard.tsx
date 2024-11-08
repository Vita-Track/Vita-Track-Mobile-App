import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

interface DoctorCardProps {
  name?: string;
  specialization?: string;
  onViewDoctor?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialization,
  onViewDoctor,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.specialization}>{specialization}</Text>
      <Button onPress={onViewDoctor} style={styles.dctBtn}>
        View Doctor
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#008080",
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
  specialization: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 4,
  },
  dctBtn: {
    backgroundColor: "#fff",
    color: "#008080",
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DoctorCard;

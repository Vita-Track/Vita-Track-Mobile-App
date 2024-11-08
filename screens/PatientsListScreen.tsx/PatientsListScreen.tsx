import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHelper from "../../hooks/useHelper";
import { DummyPatients } from "../../data"; // Adjust according to your data source
import PatientCard from "../../components/UI/PatientCard"; // Adjust the import path as necessary

const PatientListScreen = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const helper = useHelper();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const storedDoctorId = await AsyncStorage.getItem("doctorId"); // Retrieve doctor ID from storage
        if (storedDoctorId) {
          // Filter patients based on the associated doctor ID
          const associatedPatients = DummyPatients.filter((patient) =>
            patient.associatedDoctors?.some(
              (doctor) => doctor.id === storedDoctorId
            )
          );
          setPatients(associatedPatients);
        }
      } catch (error) {
        console.error("Error fetching doctor ID from storage:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleManagePatient = (patientId: string) => {
    // Logic to manage the patient (e.g., navigate to another screen)
    console.log("Manage Patient:", patientId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patientName={`${patient.firstName} ${patient.lastName}`}
            onManagePress={() => handleManagePatient(patient.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B2D8D8",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default PatientListScreen;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import {
  deleteMedicalRecord,
  getMedicalRecordsByPatientId,
} from "../../firebase/database";
import MedicalCard from "../../components/UI/MedicalCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const PatientMedicalRecordsScreen: React.FC = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [patient, setPatient] = useState<any | undefined>(undefined);

  useEffect(() => {
    const getPatientId = async () => {
      const p = await AsyncStorage.getItem("decodedPatient");
      setPatient(JSON.parse(p));
    };
    getPatientId();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (patient?.Id) {
          const records = await getMedicalRecordsByPatientId(patient.Id);
          setMedicalRecords(records);
        }
      } catch (error) {
        console.error("Error fetching medical records:", error);
        Alert.alert("Error", "Failed to load medical records.");
      }
    };

    if (patient) {
      fetchRecords();
    }
  }, [patient]);

  const handleDelete = async (recordId: string) => {
    try {
      await deleteMedicalRecord(recordId);
      setMedicalRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== recordId)
      );
      Alert.alert("Success", "Medical record deleted.");
    } catch (error) {
      console.error("Error deleting medical record:", error);
      Alert.alert("Error", "Failed to delete medical record.");
    }
  };

  const handleDownload = (record: MedicalRecord) => {
    Alert.alert("Download", `Downloading file: ${record.doc}`);
    // Implement the file download logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Medical Records</Text>
      <FlatList
        data={medicalRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicalCard
            filename={item.fileName}
            dateAdded={item.date}
            onDownload={() => handleDownload(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <Button style={styles.shareBtn} mode="contained">
        Share your health records
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 10,
  },
  list: {
    paddingBottom: 16,
  },
  shareBtn: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default PatientMedicalRecordsScreen;

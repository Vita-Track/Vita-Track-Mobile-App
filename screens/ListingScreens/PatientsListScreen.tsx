import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import PatientCard from "../../components/UI/PatientCard";
import useHelper from "../../hooks/useHelper";

const PatientsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [doctor, setDoctor] = useState<any>();
  const [associatedPatients, setAssociatedPatients] = useState<any[]>([]);

  const patients = useSelector((state: any) => state.data.patients);
  const helper = useHelper();

  useEffect(() => {
    const getDoctor = async () => {
      const d = await AsyncStorage.getItem("decodedDoctor");
      if (d) {
        const docData = JSON.parse(d);
        try {
          if (typeof docData.AssociatedPatients === "string") {
            docData.AssociatedPatients = JSON.parse(docData.AssociatedPatients);
          }
        } catch (error) {
          console.error("Error parsing AssociatedPatients", error);
          docData.AssociatedPatients = [];
        }
        setDoctor(docData);
      }
    };

    getDoctor();
  }, []);

  useEffect(() => {
    if (doctor && doctor.AssociatedPatients) {
      const associatedPatientsList = doctor.AssociatedPatients.map((pId: any) =>
        helper.findPatientFromId(patients, pId)
      );
      setAssociatedPatients(associatedPatientsList);
    }
  }, [doctor, patients]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Associated Patients</Text>
      <ScrollView>
        <View style={styles.patientsList}>
          {associatedPatients.length > 0 ? (
            associatedPatients.map((patient, index) => {
              const age =
                new Date().getFullYear() -
                new Date(patient?.dateOfBirth).getFullYear();
              return (
                <PatientCard
                  key={index}
                  name={`${patient?.firstName} ${patient?.lastName}`}
                  onViewPatient={() =>
                    navigation.navigate("patient-details-screen", {
                      patientId: patient?.id,
                    })
                  }
                  age={age}
                />
              );
            })
          ) : (
            <Text style={styles.noPatients}>No associated patients found.</Text>
          )}
        </View>
        <Button
          style={styles.backButton}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Back to Dashboard
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f7", margin: 10 },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  patientsList: { padding: 10 },
  noPatients: { color: "#888", fontStyle: "italic", textAlign: "center" },
  backButton: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default PatientsListScreen;

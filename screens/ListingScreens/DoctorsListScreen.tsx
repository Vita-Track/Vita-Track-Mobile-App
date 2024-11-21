import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import DoctorCard from "../../components/UI/DoctorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHelper from "../../hooks/useHelper";
import { useSelector } from "react-redux";

const DoctorsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [patient, setPatient] = useState<any>();
  const [associatedDoctors, setAssociatedDoctors] = useState<any[]>([]);
  const doctors = useSelector((state: any) => state.data.doctors);
  const helper = useHelper();

  useEffect(() => {
    const getPatient = async () => {
      const p = await AsyncStorage.getItem("decodedPatient");
      if (p) {
        const patientData = JSON.parse(p);
        try {
          if (typeof patientData.AssociatedDoctors === "string") {
            patientData.AssociatedDoctors = JSON.parse(
              patientData.AssociatedDoctors
            );
          }
        } catch (error) {
          console.error("Error parsing AssociatedDoctors", error);
          patientData.AssociatedDoctors = [];
        }
        setPatient(patientData);
      }
    };

    getPatient();
  }, []);

  useEffect(() => {
    if (patient && patient.AssociatedDoctors) {
      const associatedDoctorsList = patient.AssociatedDoctors.map((dId: any) =>
        helper.findDoctorFromId(doctors, dId)
      );
      setAssociatedDoctors(associatedDoctorsList);
    }
  }, [patient, doctors]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Doctors</Text>
      <ScrollView>
        <View style={styles.doctorsList}>
          {associatedDoctors.length > 0 ? (
            associatedDoctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={`${doctor?.firstName} ${doctor?.lastName}`}
                specialization={doctor?.specialization}
                onViewDoctor={() =>
                  navigation.navigate("doctor-manage-screen", {
                    doctorId: doctor?.id,
                  })
                }
              />
            ))
          ) : (
            <Text style={styles.noDoctors}>No associated doctors found.</Text>
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
  doctorsList: { padding: 10 },
  noDoctors: { color: "#888", fontStyle: "italic", textAlign: "center" },
  backButton: {
    width: "100%",
    backgroundColor: "#008080",
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default DoctorsListScreen;

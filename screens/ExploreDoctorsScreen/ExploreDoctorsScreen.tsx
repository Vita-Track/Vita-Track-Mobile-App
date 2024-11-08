import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import DoctorCard from "../../components/UI/DoctorCard";
import { DummyDoctors } from "../../data";

const ExploreDoctorsScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDoctors = DummyDoctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search byoctor's name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            name={`${item.firstName} ${item.lastName}`}
            specialization={item.specialization}
            onViewDoctor={() => {
              navigation.navigate("doctor-details", { doctorId: item.id });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
    backgroundColor: "#f0f4f7",
  },
  searchBox: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#008080",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default ExploreDoctorsScreen;

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import { addMedicalRecord } from "../../firebase/database";
import LoadingModal from "../../components/UI/LoadingModal";

const UploadHealthRecordFromDoctor: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadFromPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedRecord({
        name: asset.fileName || "Image File",
        uri: asset.uri,
      });
    }
  };

  const uploadFromFiles = async () => {
    const result = (await DocumentPicker.getDocumentAsync({
      type: [
        "image/*",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    })) as any;

    if (!result.canceled) {
      const document = result.assets ? result.assets[0] : result;
      if (document) {
        setSelectedRecord({
          name: document.name,
          uri: document.uri,
        });
      }
    }
  };

  const generateRecordId = (patientId: string): string => {
    const randomInt = Math.floor(1000 + Math.random() * 9000);
    const randomAlphabet = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    return `HR${patientId}${randomInt}${randomAlphabet}`;
  };

  const saveHealthRecord = async () => {
    if (!selectedRecord) {
      alert("Please upload a record before saving.");
      return;
    }

    try {
      setLoading(true);
      const recordId = generateRecordId(patientId);

      const medicalRecord = {
        id: recordId,
        fileName: selectedRecord.name,
        doc: selectedRecord.uri,
        patientId: patientId,
        date: new Date().toISOString(),
      };

      await addMedicalRecord(recordId, medicalRecord);
      setLoading(false);
      alert("Health record saved successfully!");
      navigation.goBack();
      setSelectedRecord(null);
    } catch (error) {
      console.error("Error saving health record:", error);
      alert("Failed to save health record. Please try again.");
    }
  };

  const removeRecord = () => {
    setSelectedRecord(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Upload Health Record</Text>
        <LottieView
          source={{
            uri: "https://lottie.host/77439e6f-0dce-40f1-a289-deb84f9395d8/NGOJwtpQk9.json",
          }}
          autoPlay
          loop
          style={{ width: "100%", height: 300 }}
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={uploadFromPhotos}
        >
          <Text style={styles.uploadText}>Upload from Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={uploadFromFiles}>
          <Text style={styles.uploadText}>Upload from Files</Text>
        </TouchableOpacity>

        {selectedRecord && (
          <View style={styles.fileContainer}>
            <Text style={styles.fileLink}>{selectedRecord.name}</Text>
            <TouchableOpacity
              onPress={removeRecord}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        <Button
          onPress={saveHealthRecord}
          style={styles.saveButton}
          textColor="#fff"
        >
          Save Record
        </Button>
        <LoadingModal visible={loading} message="Saving.." />
      </View>
    </SafeAreaView>
  );
};

export default UploadHealthRecordFromDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#008080",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontSize: 16,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eef2f3",
    borderRadius: 5,
    width: "90%",
    justifyContent: "space-between",
  },
  fileLink: {
    fontSize: 16,
    color: "#0066cc",
    textDecorationLine: "underline",
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#008080",
    borderRadius: 5,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    paddingVertical: 10,
  },
});

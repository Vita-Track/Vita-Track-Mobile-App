import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

interface MedicalCardProps {
  filename: string;
  dateAdded: string;
  onDownload: () => void;
  onDelete: () => void;
}

const MedicalCard: React.FC<MedicalCardProps> = ({
  filename,
  dateAdded,
  onDownload,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.filename}>{filename}</Text>
      <Text style={styles.dateAdded}>
        Added: {new Date(dateAdded).toLocaleDateString()}
      </Text>
      <View style={styles.actions}>
        <Button onPress={onDownload} style={styles.downloadBtn}>
          Download
        </Button>
        <Button mode="contained" onPress={onDelete} style={styles.deleteButton}>
          Delete
        </Button>
      </View>
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
  filename: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  dateAdded: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  downloadBtn: {
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#008080",
  },
  deleteButton: {
    backgroundColor: "#ff5252",
    borderRadius: 5,
  },
});

export default MedicalCard;

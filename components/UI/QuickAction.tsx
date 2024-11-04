import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-paper";

export interface IQuickActionProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const QuickAction: React.FC<IQuickActionProps> = (props) => {
  return (
    <View style={styles.quickAction}>
      <TouchableOpacity style={styles.customButton} onPress={props.onPress}>
        <Icon source={props.icon} color="#fff" size={24} />
        <Text style={styles.label}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickAction: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default QuickAction;

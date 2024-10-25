import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Tooltip } from "react-native-paper";

export interface SnackBarContents {
  icon?: string;
  label: string;
  route?: string;
}
interface SnackBarProps {
  contents: Array<SnackBarContents>;
}

const SnackBar: React.FC<SnackBarProps> = (props) => {
  return (
    <View style={styles.snackbar}>
      {props.contents.map((content, index) => (
        <>
          <Tooltip title={content.label}>
            <Icon key={index} source={content.icon} size={40} color="#008080" />
          </Tooltip>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    left: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
});

export default SnackBar;

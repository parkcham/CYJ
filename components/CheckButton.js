import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const CheckButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign
        style={styles.icon}
        size={22}
        color="#ABABAB"
        name="check"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight:10,
  },
});
export default CheckButton;

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ImagePickButton = ({ onPress,size }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons  size={size} color="pink" name="images" />
    </TouchableOpacity>
  );
};
export default ImagePickButton;

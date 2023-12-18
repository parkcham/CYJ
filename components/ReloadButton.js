import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const ReloadButton = ({ onPress,color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="reload" size={22} color={color} />
    </TouchableOpacity>
  );
};

export default ReloadButton;

import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CloseIcon = ({onPress,size,color}) => {
  return (
    <TouchableOpacity style={{alignItems:"flex-end"}}onPress={onPress}>
      <AntDesign name="closecircleo" size={size} color={color}/>
    </TouchableOpacity>
  );
};

export default CloseIcon;

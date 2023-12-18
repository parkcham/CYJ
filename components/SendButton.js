import { AntDesign,FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const SendButton = ({ onPress,color }) => {
  return (
    <TouchableOpacity style={styles.container}onPress={onPress}>
      <FontAwesome
        style={styles.icon}
        size={18}
        color="#8A8A8A"
        name="send-o"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingRight:20,
    paddingTop:5
  },
  icon: {
    // borderWidth:1,
    // padding:5,
    // borderRadius:10,
    borderColor:"#ABABAB"

  },
});
export default SendButton;

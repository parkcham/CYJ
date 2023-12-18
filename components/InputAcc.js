import React from "react";
import {
  View,
  InputAccessoryView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export function InputDone () {
  return (
    <InputAccessoryView nativeID="done">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
          <FontAwesome name="download" size={26} color="pink" />
        </TouchableOpacity>
       
      </View>
    </InputAccessoryView>
  );
};
export function InputDatePicker({date,onChange,onPress}) {
  return (
    <InputAccessoryView nativeID="DatePicker">
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingRight: 10,
        paddingBottom: 5,
      }}
    >
      <RNDateTimePicker
        style={{ height: 28, width: 90 }}
        mode="time"
        value={date}
        onChange={onChange}
        locale="ko"
      />
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={onPress}
      >
        <MaterialCommunityIcons name="send" size={26} color="pink" />
      </TouchableOpacity>
    </View>
  </InputAccessoryView>
);
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems:'center',
    paddingRight:15,
    // backgroundColor:'#EAEAEA'
  },
});
// export default InputAcc;

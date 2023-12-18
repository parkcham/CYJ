import React from "react";
import { View, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Loading from "./Loading";

const LoadingSpinner = ({ isLoding }) => {
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoding}
        textContent={"기달.."}
        animation="fade"
        
        customIndicator={<Loading />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#ecf0f1",
  },
});

export default LoadingSpinner;

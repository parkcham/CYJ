import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

const BottomModal = ({ visible, closeModal, children }) => {
  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
      
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.bottomSheetContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    // height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderWidth: 1,
    // borderColor: "#ABABAB",
  },
});

export default BottomModal;

import React, { forwardRef } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

const BottomSheet = forwardRef(
  (
    {
      height,
      keyboardAvoidingOffset,
      HeaderComponent,
      FooterComponent,
      children,
      modalStyle,
      withReactModal
    },
    ref
  ) => {
    return (
      <Modalize
        ref={ref}
        modalStyle={modalStyle}
        withReactModal={withReactModal}
        modalHeight={height}
        keyboardAvoidingOffset={keyboardAvoidingOffset}
        handlePosition="inside"
        handleStyle={styles.handleStyle}
        HeaderComponent={HeaderComponent}
        FooterComponent={FooterComponent}
        // scrollViewProps={{bounces:false}}
      >
        {children}
      </Modalize>
    );
  }
);
const styles = StyleSheet.create({
  handleStyle: {
    backgroundColor: "pink",
  },
});
export default BottomSheet;

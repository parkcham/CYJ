import React from "react";
import { StyleSheet, TextInput,Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { InputDone } from "../../components/InputAcc";

const DiaryInput = ({ title, titleOnChange, detail, detailOnChange }) => {
  return (
    <>
      <KeyboardAwareScrollView
        extraScrollHeight={50}
        extraHeight={120}
        keyboardOpeningTime={0}
        bounces={false}
        style={styles.container}
      >
        <TextInput
          style={styles.color}
          fontSize={24}
          placeholder="제목"
          inputAccessoryViewID="done"
          value={title}
          onChange={titleOnChange}
        />
        <TextInput
          style={styles.color}
          placeholder="오늘 하루를 기록 해보거라"
          inputAccessoryViewID="done"
          fontSize={18}
          value={detail}
          onChange={detailOnChange}
          multiline
          scrollEnabled={false}
        />
      </KeyboardAwareScrollView>
      {Platform.OS === 'ios' ? <InputDone /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 50,
  },
  color: {
    color: "#545454",
  },
});

export default DiaryInput;

import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const FeedInput = ({ title, titleOnChange, detail, detailOnChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.color}>제목</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="제목"
        fontSize={20}
        inputAccessoryViewID="done"
        value={title}
        onChange={titleOnChange}
      />

      <Text style={styles.color}>내용</Text>

      <TextInput
        style={styles.detailInput}
        placeholder="내용"
        fontSize={20}
        multiline
        scrollEnabled={false}
        inputAccessoryViewID="done"
        value={detail}
        onChange={detailOnChange}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 26,
    paddingTop: 15,
    // backgroundColor:"white",
    // flex:1
  },
  color: {
    color: "pink",
    paddingBottom: 5,
    paddingTop: 10,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 8,
    borderRadius: 8,
    color: "#545454",
  },
  detailInput: {
    marginBottom: 50,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    minHeight: 200,
    color: "#545454",
    borderColor: "#E0E0E0",
  },
});

export default FeedInput;

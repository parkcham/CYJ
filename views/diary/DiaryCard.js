import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity,  Text, StyleSheet } from "react-native";


const DiaryCard = ({ title, detail, id, createDate }) => {
  const navigation = useNavigation();

  const DescDiary = () => {
    navigation.navigate("DiaryDescScreen", {
      title: title,
      detail: detail,
      id: id,
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={DescDiary}
    >
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text
        numberOfLines={2}
        style={styles.detail}
      >
        {detail}
      </Text>
      <Text style={styles.createDate}>{createDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#F2F2F2",

  },
  title:{
    color: "#545454", fontSize: 22 
  },
  detail:{
    color: "#707070", fontSize: 18, paddingTop: 5 
  },
  createDate:{
    color: "#ABABAB", paddingTop: 5
  }
});
export default DiaryCard;

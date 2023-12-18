import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { removeContent } from "../lib/CommonFunction";
import events from "../lib/events";
import useDiaryDescEventEffect from "../hooks/useDiaryDescEventEffect";
import MenuBar from "../components/MenuBar";

const DiaryDesc = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [title, setTitle] = useState(params.title);
  const [detail, setDetail] = useState(params.detail);
  const [id] = useState(params.id);
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const updateDiaryDesc = () => {
    setTitle(params.newerTitle);
    setDetail(params.newerDetail);
  };

  const deleteDiary = () => {
    hideMenu();
    removeContent({ collection: "Diarys", id: id });
    events.emit("removeDiary", id);
    navigation.goBack();
  };
  const diaryUpdateScreen = () => {
    hideMenu();
    navigation.navigate("DiaryUpdateScreen", {
      title: title,
      detail: detail,
      id: id,
    });
  };
  useDiaryDescEventEffect({
    updateDiaryDesc,
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={26} color="#8A8A8A" />
        </TouchableOpacity>

        <MenuBar
          mod={diaryUpdateScreen}
          del={deleteDiary}
          visible={visible}
          showMenu={showMenu}
          hideMenu={hideMenu}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.detail}>{detail}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#545454",
  },
  titleView: {
    alignItems: "center",
    paddingBottom: 10,
  },
  detail: {
    color: "#707070",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
  },
});
export default DiaryDesc;

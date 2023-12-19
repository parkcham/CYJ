import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import format from "date-fns/format";

import SendButton from "../components/SendButton";
import { createContent, createdAt } from "../lib/CommonFunction";
import { InputDone } from "../components/InputAcc";
import EmojiModal from "../components/EmojiModal";
import events from "../lib/events";

const DdayUploadScreen = () => {
  useEffect(() => {
    navigation.setOptions({
      title: "새 디데이",
      headerRight: () => <SendButton onPress={createDday} />,
    });
  }, [][(detail, conditional)]);

  const navigation = useNavigation();
  const [detail, setDetail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()
   
  );
  const [conditional, setConditional] = useState("past");
  const [emojiIsOpen, setEmojiIsOpen] = useState(false);
  const [emoji, setEmoji] = useState("😃");
  const vSelectedDate = new Date(`${format(selectedDate, "yyyy-MM-dd")} 00:00:00`)

  const todayDate = new Date();
  const dis = todayDate - selectedDate;
  const day = Math.floor(dis / (1000 * 60 * 60 * 24));

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    fConditional();
    setSelectedDate(new Date(currentDate));
  };
  const fConditional = () => {
    if (day >= 0) {
      setConditional("past");
      return;
    }
    setConditional("future");
  };
  const createDday = () => {
    data = {
      selectedDate: vSelectedDate,
      detail: detail,
      createdAt: createdAt,
      emoji: emoji,
      conditional: conditional,
    };
    createContent({ collection: "Ddays", content: data });
    events.emit("addDday");
    navigation.goBack()
  };

  const onEmojiSelected = (emojiObject) => {
    setEmoji(emojiObject.emoji);
  };
  const emojiOpen = () => {
    setEmojiIsOpen(true);
  };
  const emojiClose = () => {
    setEmojiIsOpen(false);
  };

  return (
    <>
      <EmojiModal
        onEmojiSelected={onEmojiSelected}
        open={emojiIsOpen}
        onClose={emojiClose}
      />

      <View style={styles.container}>
        <View style={styles.dayView}>
          {day >= 0 ? (
            <Text style={styles.dayText}>{day + 1}일</Text>
          ) : (
            <Text style={styles.dayText}>D{day}</Text>
          )}
        </View>
        <TouchableOpacity onPress={emojiOpen}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.detail}
          placeholder="내용"
          fontSize={20}
          value={detail}
          onChangeText={(text) => setDetail(text)}
          inputAccessoryViewID="done"
        />
        <Text style={styles.dateText}>날짜</Text>

        <RNDateTimePicker
          accentColor="pink"
          style={styles.RNDateTimePicker}
          value={selectedDate}
          onChange={onChange}
          locale="ko"
        />
      </View>
      {Platform.OS === 'ios' ? <InputDone /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  dayView: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 20,
    color: "pink",
  },
  emojiText: {
    fontSize: 44,
  },
  detail: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 8,
    marginBottom: 15,
    marginTop: 16,
    borderRadius: 8,
    color: "#545454",
  },
  dateText: {
    color: "pink",
    margin: 5,
  },
  RNDateTimePicker: {
    borderBlockColor: "pink",
    shadowColor: "pink",
    width: 120,
  },
});

export default DdayUploadScreen;

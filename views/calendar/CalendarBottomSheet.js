import React, { useState, forwardRef } from "react";
import { View, TextInput, Text, StyleSheet ,Platform} from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

import CloseIcon from "../../components/CloseIcon";
import BottomSheet from "../../components/BottomSheet";
import CardItem from "../../components/CardItem";
import { createContent, createdAt } from "../../lib/CommonFunction";
import { InputDatePicker } from "../../components/InputAcc";

const CalendarBottomSheet = forwardRef(
  ({ selectedDate, newerSchedule, removeItem, schedule }, ref) => {
    const [detail, setDetail] = useState("");
    const [date, setDate] = useState(new Date());

    const strTime = () => {
      return (
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0")
      );
    };

    const createSchedule = () => {
      data = {
        date: selectedDate,
        time: format(date, "p"),
        strTime: strTime(),
        detail: detail,
        createdAt: createdAt,
      };
      createContent({ collection: "Days", content: data });
      newerSchedule();
    };
    const onChange = (e, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };

    return (
      <BottomSheet
        HeaderComponent={
          <View style={styles.header}>
            <Text style={styles.selectedDate}>{selectedDate}</Text>
            <Text style={styles.selectedWeek}>
              ({format(new Date(selectedDate), "EE", { locale: ko })})
            </Text>
          </View>
        }
        ref={ref}
        height={500}
        keyboardAvoidingOffset={-40}
        FooterComponent={
          <>
            <View style={styles.footer}>
              <TextInput
                placeholder="일정 추가..."
                multiline
                value={detail}
                inputAccessoryViewID="DatePicker"
                numberOfLines={2}
                onChangeText={(text) => setDetail(text)}
                style={styles.detail}
              />
            </View>
            {Platform.OS === 'ios'?<InputDatePicker
              date={date}
              onChange={onChange}
              onPress={createSchedule}
            /> : null}
          </>
        }
      >
        {schedule.length === 0 ? (
          <Text style={styles.scheduleNull}>일정 없음 !</Text>
        ) : (
          schedule.map((schedule) => (
            <View style={{ margin: 5 }} key={schedule.id}>
              <CardItem>
                <View style={styles.schedule}>
                  <Text style={styles.scheduleTime}>{schedule.time}</Text>
                  <CloseIcon
                    size={16}
                    color="pink"
                    onPress={() => removeItem(schedule.id)}
                  />
                </View>
                <Text style={styles.scheduleDetail}>{schedule.detail}</Text>
              </CardItem>
            </View>
          ))
        )}
      </BottomSheet>
    );
  }
);
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: "baseline",
  },
  selectedDate: {
    fontSize: 18,
    color: "#545454",
  },
  selectedWeek: {
    color: "#545454",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: "flex-end",
  },
  detail: {
    fontSize: 18,
    maxHeight: 60,
    marginBottom: 5,
    marginLeft: 5,
    width: "60%",
  },
  scheduleNull: {
    padding: 10,
    color: "pink",
  },
  schedule: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 10,
  },
  scheduleTime: {
    fontSize: 16,
    color: "#545454",
  },
  scheduleDetail: {
    fontSize: 16,
    paddingLeft: 14,
    paddingBottom: 14,
    color: "#545454",
  },
});

export default CalendarBottomSheet;

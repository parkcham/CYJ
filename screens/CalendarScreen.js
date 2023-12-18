import React, { useEffect, useState, useRef } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { format } from "date-fns";

import {
  getContent,
  removeContent,
  getNewerContent,
} from "../lib/CommonFunction";
import Calendar from "../components/Calendar";
import ReloadButton from "../components/ReloadButton";
import CalendarBottomSheet from "../views/calendar/CalendarBottomSheet";

const CalendarView = () => {
  useEffect(() => {
    getDate();
  }, []);

  const [schedule, setSchedule] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const calendarBottomSheet = useRef(null);

  const onOpen = () => {
    calendarBottomSheet.current?.open();
  };

  const getDate = () => {
    getContent({ collection: "Days" }).then(setDates);
  };

  const markedDates = dates.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = {
      marked: true,
      dotColor: "red",
    };
    return acc;
  }, {});

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      selectedColor: "pink",

      marked: markedDates[selectedDate]?.marked,
    },
  };

  const selectedSchedule = [];
  const daySchedule = (day) => {
    dates.forEach((d) => {
      if (d.date === day) {
        selectedSchedule.push(d);
      }
    });
  };
  const removeItem = (id) => {
    setSchedule(schedule.filter((item) => item.id !== id));
    setDates(dates.filter((item) => item.id !== id));
    removeContent({ collection: "Days", id: id });
  };

  const onDayPress = (day) => {
    onOpen();

    setSelectedDate(day.dateString);
    daySchedule(day.dateString);
    sortedDates(selectedSchedule);
  };

  const sortedDates = (s) => {
    let dates = s;
    dates.sort((a, b) => {
      return Number(a.strTime) - Number(b.strTime);
    });
    setSchedule(dates);
  };

  const newerSchedule = async () => {
    const firstSchedule = dates[0];

    const newerSchedule = await getNewerContent(firstSchedule.id, "Days");
    setDates(newerSchedule.concat(dates));
    sortedDates(newerSchedule.concat(schedule));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedSelectedDates}
        onDayPress={(day) => onDayPress(day)}
      />

      <View style={styles.reloadButton}>
        <ReloadButton onPress={getDate} color={"pink"} />
      </View>
      <CalendarBottomSheet
        ref={calendarBottomSheet}
        selectedDate={selectedDate}
        schedule={schedule}
        newerSchedule={newerSchedule}
        removeItem={removeItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  reloadButton: {
    position: "absolute",
    right: 20,
    top: 66,
  },
});
export default CalendarView;
// const getMarked = () => {
//   let marked = {};
//   for(let i = 1; i <= 10; i++) {
//     let day = i.toString().padStart(2, '0');
//     let periods = [
//       {
//         startingDay: i == 1,
//         endingDay: i == 10,
//         color: 'teal',
//       },
//       (i >= 2 && i <= 6) && {
//         startingDay: i == 2,
//         endingDay: i == 6,
//         color: 'orange',
//       }
//     ];
//     marked[`2023-09-${day}`] = {
//       periods
//     };
//   }
//   return marked;
// };

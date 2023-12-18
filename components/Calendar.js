import React from "react";
import { View
} from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "fr";

const Calendar =({markedDates,onDayPress}) => {
  return (
    <View>
    <CalendarList
    markingType="custom"
      // markedDates={markedSelectedDates}
      monthFormat="yyyy년 MM월"
      // horizontal={true}
      // pagingEnabled={true}
    // markingType="multi-dot"
      pastScrollRange={"1"}
      // markedDates={getMarked}
      markedDates={markedDates}
      // markingType="period"
      futureScrollRange={"2"}
    //   onDayPress={(day) => {
    //     onDayPress
    //   }}
      onDayPress={onDayPress}

      theme={{
     
        "stylesheet.calendar.header": {
          // headerContainer: {
          //   flex: 1,
          //   alignItems: "center",

          //   backgroundColor: "pink",
          //   borderRadius: 12,
          // },
          monthText: {
            fontSize: 22,
            // margin: 10,
          },
          dayTextAtIndex0: {
            color: "red",
          },
          dayTextAtIndex6: {
            color: "blue",
          },
        },
      //   'stylesheet.day.basic': {
          
      //    dayTextAtIndex0: {
      //        color: 'red'
      //     },
      //     dayTextAtIndex6: {
      //        color: 'blue'
      //     }
      // },
        // selectedDayBackgroundColor: "red",
        todayBackgroundColor: "#5CD1E5",
        todayTextColor: "white",
      }}
    />
    </View>
  );
};

export default Calendar;

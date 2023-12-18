import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

import { removeContent } from "../../lib/CommonFunction";
import events from "../../lib/events";

const DdayCard = ({ detail, id, selectedDate, conditional, emoji }) => {
  const now = new Date();
  const dis = new Date(`${format(now, "yyyy-MM-dd")} 00:00:00`) - selectedDate.toDate();

  const day = Math.ceil(dis / (1000 * 60 * 60 * 24));

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const deleteDday = () => {
    hideMenu();
    events.emit("removeDday", id);
    removeContent({ collection: "Ddays", id: id });
  };
  const PastDay = () => <Text style={styles.pastDay}>{day + 1}일</Text>;

  const FutureDay = () => {
    if (day < 0) {
      return <Text style={styles.futureDday}>D{day}</Text>;
    }
    if (day === 0) {
      return <Text style={styles.futureday}>D·day</Text>;
    }
    return <Text style={styles.futureday}>지남 !</Text>;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={showMenu}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 46, paddingRight: 10 }}>{emoji}</Text>

        <View>
          <Text style={styles.detail}>{detail}</Text>
          <Menu visible={visible} onRequestClose={hideMenu}>
            <MenuItem
              textStyle={styles.menuItemText}
              style={styles.menuItemStyle}
              onPress={deleteDday}
            >
              <Ionicons size={20} color="#FF1B00" name="trash-outline" />
              삭제
            </MenuItem>
          </Menu>

          <View style={styles.selectedDateView}>
            <Text style={styles.selectedDate}>
              {format(selectedDate.toDate(), "yyyy.MM.dd")}
            </Text>
            <Text style={styles.selectedWeek}>
              ({format(new Date(selectedDate.toDate()), "EE", { locale: ko })})
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.dayView}>
        {conditional === "past" ? <PastDay /> : <FutureDay />}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "center",
    marginLeft: 12,
    marginRight: 12,
    // marginBottom: 12,
    paddingBottom: 12,
    paddingTop: 12,
    flex: 1,
  },
  emoji: {
    fontSize: 30,
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 12,
  },
  detail: {
    fontSize: 24,
    paddingBottom: 5,
    color: "#545454",
  },
  selectedDate: {
    color: "#A8A8A8",
  },
  selectedWeek: {
    fontSize: 12,
    color: "#A8A8A8",
  },
  selectedDateView: {
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 18,
    color: "#FF1B00",
  },
  menuItemStyle: {
    alignItems: "center",
  },
  dayView: {
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 18,
    marginTop: 10,
    borderRadius: 10,
  },
  pastDay: {
    fontSize: 24,
    color: "pink",
  },
  futureDday: {
    fontSize: 24,
    color: "pink",
  },
  futureday: {
    fontSize: 24,
    color: "#FF1B00",
  },
});

export default DdayCard;

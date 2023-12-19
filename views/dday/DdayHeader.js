import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import format from "date-fns/format";

import {
  Animated,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 100;

const DdayHeader = ({ scrollY, day }) => {
  const setDate = new Date("2023-05-29 00:00:00");
  const now = new Date();
  const dis = new Date(`${format(now, "yyyy-MM-dd")} 00:00:00`) - setDate;
  const sday = Math.ceil(dis / (1000 * 60 * 60 * 24));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });
  const daySize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [28, 20],
    extrapolate: "clamp",
  });

  const headerColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });
  const dayColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ["#545454", "pink"],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={{
        height: day.length > 5 ? headerHeight : HEADER_MAX_HEIGHT,
      }}
    >
      <ImageBackground
        style={styles.image}
        source={require("../../assets/test.jpg")}
      >
        <View style={styles.dateView}>
          <AntDesign name="heart" size={24} color="#FF4848" />
          <Text style={styles.date}>{format(setDate, "yyyy.MM.dd")}</Text>
        </View>
        <Animated.Text style={styles.day}>{sday + 1}일</Animated.Text>
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: day.length > 5 ? headerColor : "transparent",
            alignItems: "center",
          }}
        >
          <View style={styles.headerView}>
            <Animated.Text
              style={{
                fontSize: day.length > 5 ? daySize : 28,
                color: day.length > 5 ? dayColor : "white",
                padding: 10,
                left: 0,
              }}
            >
              D·day
            </Animated.Text>
          </View>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  dateView: {
    paddingTop: 70,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "baseline",
    position: "absolute",
  },
  date: {
    paddingLeft: 5,
    paddingRight: 240,
    color: "#EAEAEA",
  },
  day: {
    fontSize: 26,
    color: "white",
    position: "absolute",
    right: 14,
    bottom: 10,
  },
  headerView: {
    justifyContent: "flex-end",
    height: "100%",
  },
});

export default DdayHeader;

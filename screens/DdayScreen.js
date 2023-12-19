import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  StatusBar,
  RefreshControl,
  Platform,
  Text
} from "react-native";

import {
  getContent,
  getNewerContent,
  getOlderContent,
} from "../lib/CommonFunction";
import DdayCard from "../views/dday/DdayCard";
import useDdayEventEffect from "./../hooks/useDdayEventEffect";
import DdayHeader from "../views/dday/DdayHeader";
const DdayScreen = () => {
  const [day, setDay] = useState([]);
  useEffect(() => {
    getDay(limit);
  }, []);
  const limit = 8;
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <DdayCard
      detail={item.detail}
      id={item.id}
      conditional={item.conditional}
      selectedDate={item.selectedDate}
      emoji={item.emoji}
    />
  );
  const removeDday = useCallback(
    (id) => {
      setDay(day.filter((day) => day.id !== id));
    },
    [day]
  );

  const addDday = useCallback(async () => {
    if (!day || day.length === 0) {
      getContent({ collection: "Ddays" }).then(setDay);
      return;
    }
    const oldDay = day[0];
    const newerDay = await getNewerContent(oldDay.id, "Ddays");

    setDay(newerDay.concat(day));
  }, [day]);

  useDdayEventEffect({
    removeDday,
    addDday,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [noMoreDday, setNoMoreDday] = useState(false);

  const getDay = (limit) => {
    getContent({ collection: "Ddays", limit: limit }).then(setDay);
  };
  const onRefresh = () => {
    setRefreshing(true);
    getDay();
    setRefreshing(false);
  };
  const onEndReached = async () => {
    if (noMoreDday || !day || day.length < limit) {
      return;
    }
    const lastDay = day[day.length - 1];
    const olderDays = await getOlderContent(lastDay.id, "Ddays");

    if (olderDays.length < limit) {
      setNoMoreDday(true);
    }
    setDay(day.concat(olderDays));
  };

  return (
    <View style={styles.container}>
    <View style={styles.rootContainer}>
        <DdayHeader day={day} scrollY={scrollY} />

        <Animated.FlatList
          data={day}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: false }
          )}
          // bounces={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              tintColor={"pink"}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          }
        />
      </View>

      <StatusBar barStyle={"dark-content"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rootContainer:{
    flex: 1
  },
  header: {
    width: "100%",
    height: 240,
  },
});
export default DdayScreen;

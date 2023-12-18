import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, Octicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import CalendarScreen from "../screens/CalendarScreen";
import FeedScreen from "../screens/FeedScreen";
import DiaryScreen from "../screens/DiaryScreen";
import DdayScreen from "../screens/DdayScreen";
import TabButton from "./TabButton";
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (

    <>

      <View style={styles.block}>
        <Tab.Navigator
          initialRouteName="Dday"
          screenOptions={{
            tabBarShowLabel: false,
            headerShadowVisible: false,

            tabBarInactiveTintColor: "pink",
            tabBarActiveTintColor: "#fb4b00",
            headerTintColor: "pink",
            // headerShadowVisible: false,
          }}
        >
            <Tab.Screen
              name="DdayScreen"
              component={DdayScreen}
              options={{
                headerTitle: "C·YJ",
                headerShown: false,

                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-today-outline" size={30} color={color} />
                ),
              }}
            />
          <Tab.Screen
            name="CalendarScreen"
            component={CalendarScreen}
            options={{
              // unmountOnBlur:true,
              headerShown: false,
              headerTitle: "Calendar",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="calendar" size={28} color={color} />
              ),
              tabBarIconStyle: {
                marginRight: 60,
              },
            }}
          />
          <Tab.Screen
            name="FeedScreen"
            component={FeedScreen}
            options={({ navigation }) => ({
              headerTitle: "Feed",
              // headerShown:false,
              // headerTitleAlign: "left",
              // headerRight: () => (
              //   <UpLoadButt onPress={() => navigation.navigate("FeedUpLoad")} />
              // ),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="logo-instagram" size={32} color={color} />
              ),
              tabBarIconStyle: {
                marginLeft: 60,
              },
            })}
          />
          <Tab.Screen
            name="DiaryScreen"
            component={DiaryScreen}
            options={{
              headerTitle: "Diary",
              tabBarIcon: ({ color, size }) => (
                <Octicons name="book" size={28} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
      <TabButton />
    </>

  );
};
export default BottomTab;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

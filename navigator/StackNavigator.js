import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import BottomTab from "../tabs/BottomTab";
import FeedUploadScreen from "../screens/FeedUploadScreen";
import DiaryUploadScreen from "../screens/DiaryUploadScreen";
import DiaryDescScreen from "../screens/DiaryDescScreen";
import FeedUpdateScreen from "../screens/FeedUpdateScreen";
import DiaryUpdateScreen from "../screens/DiaryUpdateScreen";
import DdayUploadScreen from "../screens/DdayUploadScreen";
import ImageViewScreen from "../screens/ImageViewScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="C·YJ"
          component={BottomTab}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "pink",
          }}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          headerShadowVisible: false,

          headerBackImage: () => (
            <Ionicons
              style={{ padding: 5 }}
              name="arrow-back"
              size={26}
              color="#8A8A8A"
            />
          ),
          headerBackTitleVisible: false,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTintColor: "#8A8A8A",
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="FeedUploadScreen" component={FeedUploadScreen} />
        <Stack.Screen name="DiaryUploadScreen" component={DiaryUploadScreen} />

        <Stack.Screen name="FeedUpdateScreen" component={FeedUpdateScreen} />
        <Stack.Screen name="DiaryUpdateScreen" component={DiaryUpdateScreen} />

        <Stack.Screen
          // options={{ headerShown: false }}
          name="DdayUploadScreen"
          component={DdayUploadScreen}
        />

      </Stack.Group>


      <Stack.Group
        screenOptions={{
          headerShown: false,
          gestureEnabled:false,
          headerLeft: () => {
            return null;
          },
          headerShadowVisible: false,
          // presentation:"modal"
          // transparent:"true"
          // headerTransparent:"true"
        }}
      >
        <Stack.Screen
          name="DiaryDescScreen"
          component={DiaryDescScreen}
        />
                <Stack.Screen
          name="ImageViewScreen"
          component={ImageViewScreen}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

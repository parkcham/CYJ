import React, { useState, useRef, Children } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import BottomModal from "../components/BottomModal";

const TabButton = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const TABBAR_HEIGHT = 20;
  const bottom = TABBAR_HEIGHT / 2 + insets.bottom - 4;

  const toggleModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const upLoad = (navi) => {
    closeModal()
    navigation.navigate(navi);
  };



  return (
    <View>
      <BottomModal
        // modalVisible={isModalVisible}
        // setModalVisible={setModalVisible}
        visible={isModalVisible}
        closeModal={closeModal}
        children={
          <>
            <Text style={{ padding: 10 ,fontSize:16,color:"#545454"}}>만들기</Text>

            <View
              style={{
                width: "100%",
                marginLeft: 30,
                paddingRight: 30,
                paddingBottom:60

              }}
            >
              <TouchableOpacity
                        onPress={() => upLoad("DdayUploadScreen")}

                style={{
                  // padding: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  // backgroundColor: "white",
                  paddingBottom:10,

                }}
              >
                <Ionicons name="ios-today-outline" size={24} color="pink" />

                <Text style={{ color: "pink", fontSize: 18, paddingLeft: 10 }}>
                  D·day
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                        onPress={() => upLoad("FeedUploadScreen")}

                style={{
                  // padding: 10,
                  paddingBottom:8,
                  paddingTop:8,
                  alignItems: "center",
                  flexDirection: "row",
                  // backgroundColor: "#E0E0E0",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor:"#F2F2F2"
                }}
              >
                <Ionicons name="logo-instagram" size={24} color="pink" />

                <Text style={{ color: "pink", fontSize: 18, paddingLeft: 10 }}>
                  피드
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                        onPress={() => upLoad("DiaryUploadScreen")}

                style={{
                  // padding: 12,
                  alignItems: "center",
                  flexDirection: "row",
                  // backgroundColor: "#E0E0E0",
                  paddingTop:10,
                  paddingLeft:2

                }}
              >
                <Octicons name="book" size={20} color="pink" />
                <Text style={{ color: "pink", fontSize: 18, paddingLeft: 10 }}>
                  다이어리
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      ></BottomModal>

      <View style={[styles.wrapper, { bottom }]}>
        <TouchableOpacity style={styles.circle} onPress={toggleModal}>
          {/* <Icon name="add" color="pink" size={36} /> */}
          {/* <Ionicons size={56} color="lightpink" name="md-add-circle"/> */}
          <AntDesign size={46} color="lightpink" name="smile-circle" />

          {/* <Image style={{tintColor:'pink'}}source={require('../assets/add.png')}/> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: "absolute",
    left: "50%",
    transform: [
      {
        translateX: -27,
      },
    ],
  },
  circle: {
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"flex-start",
    paddingLeft: 20,
  },
  modalCommonText: {
    paddingLeft: 10,
    color: "pink",
    fontSize: 22,
  },
  modalCreateText: {
    fontSize: 18,
    padding: 10,
    color: "#ABABAB",
  },
  diary: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
  },
});
export default TabButton;

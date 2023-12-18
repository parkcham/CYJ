import React, { useState, useRef } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import { removeContent, removeImage } from "../../lib/CommonFunction";
import { useNavigation } from "@react-navigation/native";
import events from "../../lib/events";
import MenuBar from "../../components/MenuBar";

const FeedCard = ({ id, imageUrl, title, detail, imageName }) => {
  const { width } = useWindowDimensions();
  const [line, setLine] = useState(3);
  const [isActivated, setIsActivated] = useState(false);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const handleLine = () => {
    isActivated ? setLine(3) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated((prev) => !prev);
  };

  const deleteFeed = () => {
    removeContent({ collection: "Feeds", id: id });
    events.emit("removeFeed", id);
    removeImage(imageName);
    hideMenu();
  };

  const updateFeed = () => {
    hideMenu();

    navigation.navigate("FeedUpdateScreen", {
      oldTitle: title,
      oldDetail: detail,
      // oldImageUrl: imageUrl,
      // oldImageName: imageName,
      id: id,
    });
  };

  const imageView = () => {
    navigation.navigate("ImageViewScreen", {
      imageUrl: imageUrl,
    });
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={imageView}>
      <ImageBackground
        source={{ uri: item }}
        style={{
          width: width - 20,
          height: 380,
          marginLeft: 5,
          marginRight: 5,
        }}
        // resizeMethod="resize"
        resizeMethod="resize"
        resizeMode="cover"
        imageStyle={{ borderRadius: 10 }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "flex-end",
            padding: 5,
            justifyContent: "space-between",
            flexDirection: "column-reverse",
          }}
        >
          <Text
            style={{
              color: "pink",
              borderWidth: 0.6,
              borderColor: "pink",
              borderRadius: 6,
            }}
          >
            {index + 1}/{imageUrl.length}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>C·YJ</Text>

        <View style={styles.cardHeaderEllipsis}>
          <MenuBar
            visible={visible}
            mod={updateFeed}
            del={deleteFeed}
            showMenu={showMenu}
            hideMenu={hideMenu}
          />
        </View>
      </View>

      <FlatList
        data={imageUrl}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // bounces={false}
      />
      <View
        style={{
          marginLeft: 7,
          marginRight: 14,
          marginTop: 5,
          marginBottom: 12,
          // borderBottomWidth: 0.8,
          // borderColor:"#ADADAD"
        }}
      >
        <Text style={{ fontSize: 18, color: "#545454" }}>{title} </Text>

        <TouchableOpacity onPress={handleLine}>
          <Text
            style={{ fontSize: 16, padding: 5, color: "#707070" }}
            numberOfLines={line}
            ellipsizeMode="tail"
          >
            {detail}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardHeader: {
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeaderText: {
    fontSize: 16,
    color: "#545454",
  },
  cardHeaderEllipsis: {
    justifyContent: "center",
  },
  modalText: {
    color: "pink",
    fontSize: 24,
    padding: 5,
  },
  cardTitle: {
    fontSize: 22,
    paddingLeft: 7,
    paddingTop: 7,
  },
  cardDetail: {
    fontSize: 16,
    marginLeft: 14,
    marginBottom: 10,
  },
});
export default FeedCard;

import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import LoadingSpinner from "../components/LoadingSpinner";
import { InputDone } from "../components/InputAcc";
import SendButton from "../components/SendButton";
import { createContent, imageGetUrl, createdAt } from "../lib/CommonFunction";
import CloseIcon from "../components/CloseIcon";
import ImagePickButton from "../components/ImagePickButton";
import events from "../lib/events";
import FeedInput from "../views/feed/FeedInput";
const FeedUploadScreen = () => {
  useEffect(() => {
    navigation.setOptions({
      title: "새 피드",
      headerRight: () => <SendButton onPress={createFeed} />,
    });
  }, [][(title, detail, images)]);

  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [isLoding, setLoding] = useState(false);
  const { width } = useWindowDimensions();

  const [inputs, setInputs] = useState({
    title: "",
    detail: "",
  });
  const { title, detail } = inputs;

  const onChange = (keyvalue, e) => {
    const { text } = e.nativeEvent;
    setInputs({
      ...inputs,
      [keyvalue]: text,
    });
  };

  const createFeed = async () => {
    data = {
      title: title,
      detail: detail,
      createdAt: createdAt,
    };

    if (!title) {
      Alert.alert("최소 제목 !", "", [{ text: "그래" }]);
      return;
    }
    setLoding(true);
    let dImageGetUrl = await imageGetUrl(images);
    data.imageUrl = dImageGetUrl.imageResult;
    data.imageName = dImageGetUrl.imageName;
    createContent({ collection: "Feeds", content: data });
    setLoding(false);
    events.emit("addFeed");
    navigation.goBack();
  };

  const pickImage = async () => {
    const { assets: result } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5 - images.length,
      // orderedSelection:false
    });
    const uri = [];
    try {
      for (let i = 0; i < result.length; i++) {
        uri.push(result[i].uri);
      }
    } catch (e) {
      console.log(e);
    }
    setImages(images.concat(uri));
  };

  const pickImageLimit = () => {
    if (images.length > 4) {
      Alert.alert("이미지 최대 5장 !", "", [{ text: "그래" }]);
      return;
    }
    pickImage();
  };

  const removeItem = (url) => {
    setImages(images.filter((item) => item !== url));
  };
  const ListHeaderComponent = () => (
    <View style={[styles.ListHeaderComponent, { width: width / 4 }]}>
      <TouchableOpacity // resizeMode="stretch" style={[ styles.text, { color: "blue"} ]}
        style={styles.pickImageButton}
        onPress={pickImageLimit}
      >
        <ImagePickButton onPress={pickImageLimit} size={36} />
        {images.length === 0 ? (
          <Text style={styles.imageNullText}>최대 5장</Text>
        ) : (
          <View style={styles.imageLengthView}>
            <Text style={styles.imageLengthText}>{images.length}</Text>
            <Text>/5</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View>
      <ImageBackground
        source={{ uri: item }}
        style={[styles.imageBackground, { width: width / 4 }]}
        imageStyle={styles.imageStyle}
        // resizeMode="stretch"
      >
        <View style={styles.imageInText}>
          <CloseIcon onPress={() => removeItem(item)} size={16} color="pink" />
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.contanier}
        extraScrollHeight={50}
        extraHeight={120}
        keyboardOpeningTime={0}
      >
        <LoadingSpinner isLoding={isLoding} />

        <View style={styles.image}>
          <FlatList
            data={images}
            horizontal={true}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
          />
        </View>
        <FeedInput
          title={title}
          titleOnChange={(e) => onChange("title", e)}
          detail={detail}
          detailOnChange={(e) => onChange("detail", e)}
        />
      </KeyboardAwareScrollView>
      {Platform.OS === 'ios' ? <InputDone /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 110,
    marginTop: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  imageNullText: {
    color: "#8A8A8A",
  },
  pickImageButton: {
    alignItems: "center",
  },
  imageLengthView: {
    flexDirection: "row",
  },
  imageLengthText: {
    color: "pink",
  },
  imageBackground: {
    height: 110,
    marginRight: 5,
    marginLeft: 5,
  },
  imageInText: {
    height: "100%",
    alignItems: "flex-end",
    padding: 5,
    justifyContent: "space-between",
  },
  ListHeaderComponent: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // borderWidth: 1,
    marginLeft: 10,
    borderRadius: 10,
    // borderColor: "pink",
    backgroundColor: "#F5F5F5",
    marginRight: 5,
  },
});

export default FeedUploadScreen;

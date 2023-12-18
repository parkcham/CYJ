import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ImageViewScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { width } = useWindowDimensions();

  const renderItem = ({ item }) => (
    <View style={ [styles.imageView ,{width: width} ]}>

      <ImageBackground
        source={{ uri: item }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.contanier}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={26} color="#8A8A8A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={params.imageUrl}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageView: {
    height: 600,
    marginBottom: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1A1A1A",
  },
});

export default ImageViewScreen;

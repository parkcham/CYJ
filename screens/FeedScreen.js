import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";

import FeedCard from "../views/feed/FeedCard"
import useFeedScreen from "../hooks/useFeedScreen";

const Feed = () => {
  const { feeds, onEndReached, onRefresh, refreshing } = useFeedScreen();

  const renderItem = ({ item }) => (
    <View>
      <FeedCard
        title={item.title}
        detail={item.detail}
        imageUrl={item.imageUrl}
        imageName={item.imageName}
        id={item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.contanier}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={feeds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl
            tintColor={"pink"}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default Feed;

import {
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";

import DiaryCard from "../views/diary/DiaryCard"
import useDiaryScreen from "../hooks/useDiaryScreen";
const Diary = () => {
  const { diarys, onEndReached, onRefresh, refreshing } = useDiaryScreen();

  const renderItem = ({ item }) => (
    <DiaryCard
      title={item.title}
      detail={item.detail}
      id={item.id}
      createDate={item.createDate}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={diarys}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        keyExtractor={(item) => item.id}
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
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default Diary;

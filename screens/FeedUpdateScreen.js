import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
} from "react-native";

import { InputDone } from "../components/InputAcc";
import CheckButton from "../components/CheckButton";
import { updateContent } from "../lib/CommonFunction";
import events from "../lib/events";
import FeedInput from "../views/feed/FeedInput";

const FeedUpdateScreen = () => {
  useEffect(() => {
    navigation.setOptions({
      title: "피드 수정",
      headerRight: () => <CheckButton onPress={updateFeed} />,
    });
  }, [][(title, detail)]);

  const { params } = useRoute();
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    title: params.oldTitle,
    detail: params.oldDetail,
  });
  const { title, detail } = inputs;

  const onChange = (keyvalue, e) => {
    const { text } = e.nativeEvent;
    setInputs({
      ...inputs,
      [keyvalue]: text,
    });
  };

  const updateFeed = async () => {
    data = {
      title: title,
      detail: detail,
    };
    navigation.goBack();
    await updateContent({ collection: "Feeds", content: data, id: params.id });
    events.emit("updateFeed", {
      id: params.id,
      data: data,
    });
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.contanier}
        extraScrollHeight={50}
        extraHeight={120}
        keyboardOpeningTime={0}
        bounces={false}
      >
        <FeedInput
          title={title}
          titleOnChange={(e) => onChange("title", e)}
          detail={detail}
          detailOnChange={(e) => onChange("detail", e)}
        />
      </KeyboardAwareScrollView>
      <InputDone />
    </>
  );
};
const styles = StyleSheet.create({
  contanier:{
    flex:1,
    backgroundColor:"white"
  }
});

export default FeedUpdateScreen;

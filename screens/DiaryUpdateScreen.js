import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { updateContent } from "../lib/CommonFunction";
import CheckButton from "../components/CheckButton";
import events from "../lib/events";
import DiaryInput from "../views/diary/DiaryInput";

const DiaryModifyScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [inputs, setInputs] = useState({
    title: params.title,
    detail: params.detail,
  });
  const { title, detail } = inputs;

  useEffect(() => {
    navigation.setOptions({
      title: "다이어리 수정",

      headerRight: () => <CheckButton onPress={updateDiary} />,
    });
  }, [title, detail]);

  const onChange = (keyvalue, e) => {
    const { text } = e.nativeEvent;
    setInputs({
      ...inputs,
      [keyvalue]: text,
    });
  };

  const updateDiary = async () => {
    data = {
      title: title,
      detail: detail,
    };
    navigation.goBack();
    await updateContent({
      collection: "Diarys",
      content: data,
      id: params.id,
    });
    navigation.navigate("DiaryDescScreen", {
      newerTitle: title,
      newerDetail: detail,
    });
    events.emit("updateDiary", { id: params.id, data: data });
    events.emit("updateDiaryDesc");
  };
  return (
    <>
      <DiaryInput
        title={title}
        titleOnChange={(e) => onChange("title", e)}
        detail={detail}
        detailOnChange={(e) => onChange("detail", e)}
      />
    </>
  );
};
export default DiaryModifyScreen;

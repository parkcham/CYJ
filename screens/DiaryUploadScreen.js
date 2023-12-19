import React, { useEffect, useState } from "react";
import { useNavigation ,} from "@react-navigation/native";
import format from "date-fns/format";

import { createContent, createdAt } from "../lib/CommonFunction";
import SendButton from "../components/SendButton";
import events from "../lib/events";
import DiaryInput from "../views/diary/DiaryInput";

const DiaryUploadScreen = () => {
  useEffect(() => {
    navigation.setOptions({
      title: "새 다이어리",

      headerRight: () => <SendButton onPress={createDiray} />,
    });
  }, [][(title, detail)]);

  const navigation = useNavigation();

  const createDate = new Date();

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
  const createDiray = () => {
    data = {
      title: title,
      detail: detail,
      createDate: format(createDate, "yyyy.MM.dd"),
      createdAt: createdAt,
    };

    createContent({ collection: "Diarys", content: data });
    events.emit("addDiary");
    navigation.goBack();
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
export default DiaryUploadScreen;

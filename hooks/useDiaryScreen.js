import React, { useState, useEffect, useCallback } from "react";
import {
  getContent,
  getOlderContent,
  getNewerContent,
} from "../lib/CommonFunction";
import useDiaryEventEffect from "./useDiaryEventEffect";

export default function useDiaryScreen() {
  const [diarys, setDiarys] = useState([]);
  const [noMoreDiary, setNoMoreDiary] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDiary(10)    
  }, []);

  const removeDiary = useCallback(
    (id) => {
      setDiarys(diarys.filter((diary) => diary.id !== id));
    },
    [diarys]
  );

  const getDiary = (limit) => {
    getContent({ collection: "Diarys", limit: limit }).then(setDiarys);
  }
  const updateDiary = useCallback(
    ({ id, data} ) => {
      const nextDiarys = diarys.map((diary) =>
        diary.id === id
          ? {
              ...diary,
              ...data
            }
          : diary
      );
      setDiarys(nextDiarys);
    },
    [diarys]
  );
  const addDiary = useCallback(async () =>{
    if (!diarys || diarys.length === 0 || refreshing) {
      getContent({ collection: "Diarys" }).then(setDiarys);
      return;
    }
    const oldDiary = diarys[0]
    const newerDiarys = await getNewerContent(oldDiary.id,"Diarys")

    setDiarys(newerDiarys.concat(diarys))
  },[diarys,refreshing])

  const onEndReached = async () => {
    console.log("onEndReached");
    if (noMoreDiary || !diarys || diarys.length < 12) {
      return;
    }
    const lastDiary = diarys[diarys.length - 1];
    const olderDiarys = await getOlderContent(lastDiary.id, "Diarys");

    if (olderDiarys.length < 12) {
      setNoMoreDiary(true);
    }
    setDiarys(diarys.concat(olderDiarys));
  };
  const onRefresh = () => {
    setRefreshing(true)
    getDiary()
    setRefreshing(false)
  }

  useDiaryEventEffect({
    removeDiary,
    updateDiary,
    addDiary
  });
  return { diarys, refreshing, onEndReached,addDiary, onRefresh };
}

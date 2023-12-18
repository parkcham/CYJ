import { useEffect } from "react";
import events from "../lib/events";

export default function useDiaryEventEffect({ removeDiary, updateDiary,addDiary }) {
  useEffect(() => {
    events.addListener("removeDiary", removeDiary);
    events.addListener("updateDiary", updateDiary);
    events.addListener("addDiary", addDiary);

    return () => {
      events.removeListener("removeDiary", removeDiary);
      events.removeListener("updateDiary", updateDiary);
      events.removeListener("addDiary", addDiary);

    };
  }, [removeDiary, updateDiary,addDiary]);
}

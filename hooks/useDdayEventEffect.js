import { useEffect } from "react";
import events from "../lib/events";

export default function useDdayEventEffect({ removeDday,addDday }) {
  useEffect(() => {
    events.addListener("removeDday", removeDday);
    events.addListener("addDday", addDday);

    return () => {
      events.removeListener("removeDday", removeDday);
      events.removeListener("addDday", addDday);

    };
  }, [removeDday,addDday]);
}

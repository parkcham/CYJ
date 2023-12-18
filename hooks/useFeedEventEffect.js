import { useEffect } from "react";
import events from "../lib/events";

export default function useFeedEventEffect({ removeFeed,updateFeed,addFeed }) {
  useEffect(() => {
    events.addListener("removeFeed", removeFeed);
    events.addListener("updateFeed", updateFeed);
    events.addListener("addFeed", addFeed);

    return () => {
      events.removeListener("removeFeed", removeFeed);
      events.removeListener("updateFeed", updateFeed);
      events.removeListener("addFeed", addFeed);

    };
  }, [removeFeed,updateFeed,addFeed]);
}

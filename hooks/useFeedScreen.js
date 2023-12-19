import { useState,useEffect,useCallback } from "react";

import { getContent, getOlderContent,getNewerContent } from "../lib/CommonFunction";
import useFeedEventEffect from "./useFeedEventEffect";

export default function useFeedScreen() {
  const limit = 2
  const [feeds, setFeeds] = useState([]);
  const [noMoreFeed, setNoMoreFeed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    getFeed(limit)
  }, []);

  const getFeed= (limit) =>{
    getContent({ collection: "Feeds" ,limit:limit}).then(setFeeds);
  }
  const removeFeed = useCallback( id =>{ 
    setFeeds(feeds.filter(feed => feed.id !==id ))
  },[feeds])

  const updateFeed = useCallback(
    ({id,data}) => {
      const nextFeeds = feeds.map(feed =>
        feed.id === id
          ? {
              ...feed,
              ...data
            }
          : feed,
      );
      setFeeds(nextFeeds);
    },
    [feeds],
  );
  const onEndReached = async () => {
    console.log("onEndReached");
    if (noMoreFeed || !feeds || feeds.length < limit) {

      return;
    }
    const lastFeed = feeds[feeds.length - 1];
    const olderFeeds = await getOlderContent(lastFeed.id, "Feeds",limit);

    if (olderFeeds.length < limit) {
      setNoMoreFeed(true);
    }
    setFeeds(feeds.concat(olderFeeds));
  };

  const onRefresh = () =>{
    setRefreshing(true);
    getFeed()
    setRefreshing(false);

  }
  const addFeed = useCallback(async () => {
    // console.log("refresh")
    if (!feeds || feeds.length === 0 || refreshing) {
      getFeed()
      return;
    }
    const firstFeeds = feeds[0];

    const newerFeeds = await getNewerContent(firstFeeds.id, "Feeds");
    setFeeds(newerFeeds.concat(feeds));
  },[feeds,refreshing])

  useFeedEventEffect({
    removeFeed,
    updateFeed,
    addFeed
  })
  return { feeds, onEndReached,onRefresh,refreshing };
}

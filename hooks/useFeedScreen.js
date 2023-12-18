import { useState,useEffect,useCallback } from "react";

import { getContent, getOlderContent,getNewerContent } from "../lib/CommonFunction";
import useFeedEventEffect from "./useFeedEventEffect";

export default function useFeedScreen() {
  const [feeds, setFeeds] = useState([]);
  const [noMoreFeed, setNoMoreFeed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    getFeed(2)
  }, []);

  const getFeed= (limit) =>{
    getContent({ collection: "Feeds" ,limit:limit}).then(setFeeds);
    console.log("뭘 가져와")
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
    if (noMoreFeed || !feeds || feeds.length < 2) {

      return;
    }
    const lastFeed = feeds[feeds.length - 1];
    const olderFeeds = await getOlderContent(lastFeed.id, "Feeds",2);

    if (olderFeeds.length <  2) {
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
  // const onRefresh = useCallback(async () => {
  //   console.log("refresh")
  //   if (!feeds || feeds.length === 0 || refreshing) {
  //     getContent({ collection: "Feeds" }).then(setFeeds);
  //     console.log("데이터 없을떄")
  //     return;
  //   }
  //   const firstFeeds = feeds[0];
  //   setRefreshing(true);

  //   const newerFeeds = await getNewerContent(firstFeeds.id, "Feeds");
  //   setRefreshing(false);
  //   if (newerFeeds.length === 0) {
  //     return;
  //   }
  //   setFeeds(newerFeeds.concat(feeds));
  // }, [feeds, refreshing]);


  useFeedEventEffect({
    removeFeed,
    updateFeed,
    addFeed
  })
  return { feeds, onEndReached,onRefresh,refreshing };
}

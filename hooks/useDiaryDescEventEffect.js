import { useEffect } from "react";
import events from "../lib/events";

export default function useDiaryDescEventEffect({ updateDiaryDesc }) {
  useEffect(() => {
    events.addListener("updateDiaryDesc", updateDiaryDesc);
    return () => {
      events.removeListener("updateDiaryDesc", updateDiaryDesc);
    };
  }, [updateDiaryDesc]);
}

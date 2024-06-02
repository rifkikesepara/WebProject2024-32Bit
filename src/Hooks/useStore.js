import { useState } from "react";
import useData from "./useData";

//fetches and returns the dummy data of the store
export default function useStore() {
  const [info, setInfo] = useState({});
  useData("./storeInfo.json", (data) => setInfo(data));

  return info;
}

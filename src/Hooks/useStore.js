import { useState } from "react";
import useData from "./useData";

export default function useStore() {
  const [info, setInfo] = useState({});
  useData("./storeInfo.json", (data) => setInfo(data));

  return info;
}
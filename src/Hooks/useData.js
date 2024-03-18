import axios from "axios";
import { useEffect } from "react";

export default function useData(api, data, fnc = () => {}, dependencies = []) {
  useEffect(() => {
    fnc();
    axios
      .get(api)
      .then((response) => data(response.data))
      .catch((err) => console.log(err));
  }, [...dependencies]);
}

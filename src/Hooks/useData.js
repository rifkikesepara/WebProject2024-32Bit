import axios from "axios";
import { useEffect } from "react";

export default function useData(api, data, fnc = () => {}, dependencies = []) {
  const isArray = Array.isArray(api);
  const array = [];
  useEffect(() => {
    if (!isArray) {
      axios
        .get(api)
        .then((response) => data(response.data))
        .catch((err) => console.log(err));
    } else {
      api.map((API) => {
        axios
          .get(API)
          .then((response) => {
            array.push(response.data);
          })
          .catch((err) => console.log(err));
      });
      data(array);
    }
    fnc();
  }, [...dependencies]);
}

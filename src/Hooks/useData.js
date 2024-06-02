import axios from "axios";
import { useEffect } from "react";

export default function useData(
  api,
  resp = (data) => {},
  fnc = () => {},
  dependencies = []
) {
  const isArray = Array.isArray(api);
  const array = [];
  useEffect(() => {
    if (!isArray) {
      axios
        .get(api)
        .then((response) => resp(response.data))
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
      resp(array);
    }
    fnc();
  }, [...dependencies]);
}

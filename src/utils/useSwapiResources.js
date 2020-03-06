/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { winnerCard } from "../utils/randomandwin";

export function useSwapiResources(
  setOrigCollection,
  setCollection,
  setLoading,
  selectResource,
  isTwoPlayers
) {
  const getSwapiData = () => {
    let tempResult = [];

    const getAxiosData = async path => {
      await axios
        .get(`${API_URL}/${path}`)
        .then(res => {
          tempResult = [...tempResult, ...res.data.results];

          if (res.data.next !== null) {
            const next = res.data.next.match(/\/api\/(.*)/)[1];

            getAxiosData(next);
          } else {
            setOrigCollection(tempResult);
            const axiosResult = [...tempResult];

            const ww = winnerCard(axiosResult, selectResource);

            setCollection(ww);

            if (isTwoPlayers.score) {
              const indx = ww.findIndex(v => v.win === true);

              const arr = [...isTwoPlayers.score];
              arr[indx] = arr[indx] + 1;

              isTwoPlayers.isWinner(arr);
            }

            setLoading(false);
          }
        })

        .catch(err => {
          console.log("ERR", err);
        });
    };

    getAxiosData(selectResource);
  };

  useEffect(() => {
    if (selectResource !== "") {
      setLoading(true);

      getSwapiData();
    }
  }, [selectResource]);
}

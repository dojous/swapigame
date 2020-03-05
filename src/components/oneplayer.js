/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";

import GameCard from "./common/gamecard";

import { API_URL } from "../config";
import { winnerCard } from "../utils/randomandwin";

import ControlPanel from "./common/controlpanel";
import Loader from "./spinner";

const OnePlayer = ({ resources }) => {
  const [origCollection, setOrigCollection] = useState([]);

  const [collection, setCollection] = useState([]);
  const [loading, setloading] = useState();

  const [selectResource, setSelectResource] = useState("");

  const handleSelect = useCallback(selectSate => {
    setSelectResource(selectSate);
  }, []);

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
            setloading(false);
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
      setloading(true);

      getSwapiData();
    }
  }, [selectResource]);

  const checkTheWinner = useCallback(() => {
    const newArray = [...origCollection];

    const ww = winnerCard(newArray, selectResource);
    setCollection(ww);
  }, [origCollection]);

  return (
    <>
      <ControlPanel
        resources={resources}
        handleSelect={handleSelect}
        checkTheWinner={checkTheWinner}
        selectResource={selectResource}
      />

      <div className="flex-container">
        {loading ? (
          <Loader />
        ) : (
          collection.length !== 0 &&
          collection.map(item => {
            return (
              <>
                <div className="row">
                  <div className="flex-item">
                    {" "}
                    <GameCard
                      key={new Date().getUTCMilliseconds()}
                      item={item}
                      selectResource={selectResource}
                    />{" "}
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default OnePlayer;

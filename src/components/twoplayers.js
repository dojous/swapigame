/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";

import { withRouter } from "react-router-dom";

import GameCard from "./common/gamecard";
import { API_URL } from "../config";
import { winnerCard } from "../utils/randomandwin";

import ControlPanel from "./common/controlpanel";
import Loader from "./spinner";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

const TwoPlayers = ({ resources }) => {
  const [collection, setCollection] = useState([]);

  const [score, setScore] = useState([0, 0]);

  const [origCollection, setOrigCollection] = useState([]);

  const [selectResource, setSelectResource] = useState("");

  const [loading, setloading] = useState();

  const handleSelect = useCallback(selectSate => {
    setSelectResource(selectSate);
    isWinner([0, 0]);
  }, []);

  const isWinner = useCallback(
    arr => {
      setScore(arr);
    },
    [score]
  );

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

            const indx = ww.findIndex(v => v.win === true);

            const arr = [...score];
            arr[indx] = arr[indx] + 1;

            isWinner(arr);

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

    const indx = ww.findIndex(v => v.win === true);

    const arr = [...score];
    arr[indx] = arr[indx] + 1;

    isWinner(arr);
  }, [collection, isWinner]);

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
          collection.length !== 0 && (
            <>
              <div className="row">
                <div className="flex-item">
                  {" "}
                  <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                    <Typography variant="h5" component="h2">
                      This card won {score[0]} times
                    </Typography>
                  </Zoom>
                </div>
              </div>

              {collection.map((item, index) => {
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
              })}

              <div className="row">
                <div className="flex-item">
                  {" "}
                  <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                    <Typography variant="h5" component="h2">
                      This card won {score[1]} times
                    </Typography>
                  </Zoom>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default withRouter(TwoPlayers);

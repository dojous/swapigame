/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import GameCard from "./common/gamecard";
import { winnerCard } from "../utils/randomandwin";
import { useSwapiResources } from "../utils/useSwapiResources";
import ControlPanel from "./common/controlpanel";
import Loader from "./spinner";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

const TwoPlayers = ({ resources }) => {
  const [collection, setCollection] = useState([]);

  const [score, setScore] = useState([0, 0]);

  const [origCollection, setOrigCollection] = useState([]);

  const [selectResource, setSelectResource] = useState("");

  const [loading, setLoading] = useState();

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

  useSwapiResources(
    setOrigCollection,
    setCollection,
    setLoading,
    selectResource,
    { score, isWinner }
  );

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

              {collection.map((item, index) => (
                <div className="row" key={index}>
                  <div className="flex-item">
                    {" "}
                    <GameCard
                      item={item}
                      selectResource={selectResource}
                    />{" "}
                  </div>
                </div>
              ))}

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

export default TwoPlayers;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { useSwapiResources } from "../utils/useSwapiResources";
import GameCard from "./common/gamecard";
import { winnerCard } from "../utils/randomandwin";
import ControlPanel from "./common/controlpanel";
import Loader from "./spinner";

const OnePlayer = ({ resources }) => {
  const [origCollection, setOrigCollection] = useState([]);

  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState();

  const [selectResource, setSelectResource] = useState("");

  const handleSelect = useCallback(selectSate => {
    setSelectResource(selectSate);
  }, []);

  useSwapiResources(
    setOrigCollection,
    setCollection,
    setLoading,
    selectResource,
    false
  );

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
          collection.map((item, index) => (
            <div className="row" key={index}>
              <div className="flex-item">
                {" "}
                <GameCard item={item} selectResource={selectResource} />{" "}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OnePlayer;

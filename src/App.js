import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";

import Home from "./components/home";
import OnePlayer from "./components/oneplayer";
import TwoPlayer from "./components/twoplayers";
import axios from "axios";
import { API_URL } from "./config";

import Loader from "./components/spinner";

function App() {
  const [resources, setRecources] = useState([]);

  const getRecources = async () => {
    await axios
      .get(`${API_URL}/`)
      .then(res => {
        setRecources(Object.keys(res.data));
      })

      .catch(err => {
        console.log("ERR", err);
      });
  };

  useEffect(() => {
    getRecources();
  }, []);

  if (resources.length === 0) {
    return (
      <div className="App">
        <Loader color="black" />
        <h1>Loading swapi-game data</h1>
      </div>
    );
  }

  return (
    <div className="App">
          <Switch>
        <Route path="/" exact render={props => <Home />} />
        <Route
          path="/oneplayer"
          render={props => <OnePlayer resources={resources} {...props} />}
        />

        <Route
          path="/twoplayer"
          render={props => <TwoPlayer resources={resources} {...props} />}
        />

        <Suspense
          fallback={
            <>
              <Loader color="black" />
              <h1>Loading page details</h1>
            </>
          }
        >
          <Route
            path={`/${"(" + resources.join("|") + ")"}/:id`}
            component={LazyItemDetaileds}
          />
        </Suspense>

        <Route path="/not-found" component={() => <div>Page not found</div>} />

        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

const LazyItemDetaileds = () => {
  const ItemDetailed = lazy(() =>
    new Promise(resolve => setTimeout(resolve, 1)).then(resolve =>
      import("./components/itemdetailed")
    )
  );

  return <ItemDetailed />;
};

export default App;

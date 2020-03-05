import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./spinner";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config";
import Button from "@material-ui/core/Button";
const ItemDetailed = props => {
  let path = `${props.location.pathname}`;

  const [data, setData] = useState(null);

  const [err, setErr] = useState(null);

  useEffect(() => {
    const getCollections = async () => {
      await axios
        .get(`${API_URL}${path}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log("ERR", err);
          setErr(err);
          throw new Error("We are sorry, but we have: " + err.message);
        });
    };

    getCollections();
  }, [path]);

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  });

  if (data === null && err === null) {
    return (
      <div className="ui center aligned container">
        <Loader color="green" />
        <h1>Loading AXIOS data</h1>
      </div>
    );
  }

  if (err != null) {
    return <h1>{err}</h1>;
  }

  var tifOptions = Object.keys(data).map(key => {
    return (
      <div className="ui feed" key={Math.random(100)}>
        <div className="event">
          <div className="label">
            <i className="check icon" />
          </div>
          <div className="content">
            <p style={{ fontWeight: "bold" }}>{key.toUpperCase()}</p>
            <div className="ui list">
              {Array.isArray(data[key])
                ? data[key].map(item => (
                    <div className="item" key={Math.random(100)}>
                      <i className="linkify icon" />
                      <div className="content">
                        <Link to={`/${item.match(/\/api\/(.*)/)[1]}`}>
                          {item}
                        </Link>
                      </div>
                    </div>
                  ))
                : data[key]}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.history.goBack()}
        >
          Back to previous page
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => props.history.push("/")}
        >
          Back to main page
        </Button>
      </div>

      {tifOptions}
    </div>
  );
};

export default withRouter(ItemDetailed);

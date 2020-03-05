import React from "react";

function Loader(props) {
  const { color } = props;

  return (
    <>
      <div className="loader center">
        <i className="fa fa-cog fa-spin" style={{ color: color }} />
      </div>
    </>
  );
}

export default Loader;

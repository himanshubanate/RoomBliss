import React from "react";

const NoData = () => {
  return (
    <div className="no-data">
      <img src="/assets/no-data.svg" height={80} width={200} />
      <h3 style={{ textAlign: "center" }}>No data found !</h3>
    </div>
  );
};

export default NoData;

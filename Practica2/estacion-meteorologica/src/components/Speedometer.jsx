import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export const SpeedmeterComponent = (value = 0) => {
  const valor = Number(value.value);
  return (
    <>
      <ReactSpeedometer
        maxValue={120}
        value={valor}
        needleColor="blue"
        startColor="green"
        segments={10}
        endColor="red"
      />
    </>
  );
};

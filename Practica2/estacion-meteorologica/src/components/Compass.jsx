import React from "react";
//import { GradientCircularProgress } from "react-circular-gradient-progress";
import { Rose } from "@ant-design/charts";

export const CompassComponent = (value = 0) => {
  const valor = Number(value.value);
  var data =
    (valor === 0 && [
      {
        type: "Norte",
        value: 270,
      },
      {
        type: "Este",
        value: 100,
      },
      {
        type: "Sur",
        value: 100,
      },
      {
        type: "Oeste",
        value: 100,
      },
    ]) ||
    (valor === -1 && [
      {
        type: "Norte",
        value: 270,
      },
      {
        type: "Este",
        value: 100,
      },
      {
        type: "Sur",
        value: 100,
      },
      {
        type: "Oeste",
        value: 100,
      },
    ]) ||
    (valor === 90 && [
      {
        type: "Norte",
        value: 100,
      },
      {
        type: "Este",
        value: 100,
      },
      {
        type: "Sur",
        value: 270,
      },
      {
        type: "Oeste",
        value: 100,
      },
    ]) ||
    (valor === 180 && [
      {
        type: "Norte",
        value: 100,
      },
      {
        type: "Este",
        value: 270,
      },
      {
        type: "Sur",
        value: 100,
      },
      {
        type: "Oeste",
        value: 100,
      },
    ])||
    (valor === 270 && [
      {
        type: "Norte",
        value: 100,
      },
      {
        type: "Este",
        value: 100,
      },
      {
        type: "Sur",
        value: 100,
      },
      {
        type: "Oeste",
        value: valor,
      },
    ]);

  var config = {
    data: data,
    xField: "type",
    yField: "value",
    seriesField: "type",
    radius: 0.9,
    legend: { position: "bottom" },
  };

  return (
    <>
      <Rose {...config} />
      {/* <GradientCircularProgress startColor="#00C9FF" endcolor="#FF0000" middlecolor="#8700FF" size={200} progress={75} withSnail={true} /> */}
    </>
  );
};

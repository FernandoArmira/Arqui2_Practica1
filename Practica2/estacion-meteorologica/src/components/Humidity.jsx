import React from "react";
//import {Humidity} from 'react-environment-chart';
import { Liquid } from "@ant-design/charts";

export const HumidityComponent = (value = 0) => {
  const valor = Number(value.value);
  var config = {
    percent: valor / 100,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: { length: 128 },
  };
  return (
    <>
      {/* <Humidity value={valor} tips={['Bajo','Medio','Alto']} /> */}
      <Liquid {...config} />
    </>
  );
};

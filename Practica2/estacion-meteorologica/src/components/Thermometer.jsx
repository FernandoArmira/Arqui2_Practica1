import React from "react";
import Thermometer from "react-thermometer-ecotropy";

export const ThermometerComponent = (value=0) => {
    const valor = Number(value.value);
  return (
      <Thermometer
        theme="light"
        value={valor}
        max="100"
        steps="3"
        format="°C"
        size="large"
        height="300"
      />
  );
};

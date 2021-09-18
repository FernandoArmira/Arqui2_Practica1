import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { Typography, Card, CardContent, IconButton } from "@material-ui/core";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Reportes = ({
  dataDashboard = [],
  dataDashboardTotalTime = [],
  dataDashboardPromedioUseTime = [],
  dataDashboardTTime = [],
  dataDashboardPromedioLevanta = [],
}) => {
  const data = {
    labels: dataDashboard.map(({ fecha }) => fecha),
    datasets: [
      {
        label: "Peso",
        data: dataDashboard.map(({ peso }) => peso),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const v = dataDashboardTotalTime
      .filter((row) => row !== null).sort((a, b) => b.tiempototal - a.tiempototal);

  const datapie = {
    labels: v
      .filter((row) => row !== null)
      .map(({ dia }) => dia),
    datasets: [
      {
        label: "Cantidad de Uso",
        data: v
          .filter((row) => row !== null)          
          .map(({ tiempototal }) => tiempototal),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(211, 211, 211, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(211, 211, 200, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const n = dataDashboardTotalTime
      .filter((row) => row !== null).sort((a, b) => a.tiempototal - b.tiempototal);

  const datadiasmenos = {
    labels: n
      .filter((row) => row !== null)
      .map(({ dia }) => dia),
    datasets: [
      {
        label: "Cantidad de Uso",
        data: n
          .filter((row) => row !== null)          
          .map(({ tiempototal }) => tiempototal),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(211, 211, 211, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(211, 211, 200, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: dataDashboardPromedioLevanta
      .filter((row) => row !== null)
      .map(({ dia }) => dia),
    datasets: [
      {
        label: "Promedio de veces que se levanta.",
        data: dataDashboardPromedioLevanta
          .filter((row) => row !== null)
          .sort((a, b) => a - b)
          .map(({ promediolevantadas }) => promediolevantadas),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(211, 211, 211, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(211, 211, 200, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        color="inherit"
        noWrap
        align="center"
      >
        Dias de Mayor Uso
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar data={datapie} options={options} />
        </Grid>
      </Grid>
      <br></br>
      <Typography
        component="h1"
        variant="h3"
        color="inherit"
        noWrap
        align="center"
      >
        Dias de Menor Uso
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar data={datadiasmenos} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

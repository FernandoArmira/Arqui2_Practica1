import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Grid, TextField, Button } from "@material-ui/core";

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

export const Dashboard = ({
  dataDashboard = [],
  dataDashboardTotalTime = [],
  dataDashboardPromedioUseTime = [],
  dataDashboardTTime = [],
  dataDashboardPromedioLevanta = [],
  dataUsuario,
  setDataUsuario,
  dataRealTime = []
}) => {
  const primerosDiez = dataDashboard.slice(0, 10);
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

  const datapie = {
    labels: dataDashboardTotalTime
      .filter((row) => row !== null)
      .map(({ dia }) => dia),
    datasets: [
      {
        label: "Cantidad de Uso",
        data: dataDashboardTotalTime
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

  const handleSubmitSilla = async (event) => {
    event.preventDefault();
    const silla = event.target.silla.value;
    const response = await fetch("http://localhost:3001/selectsilla", {
      method: "POST",
      body: JSON.stringify({id:silla}),
      headers: { "Content-Type": "application/json" },
    });
    const datares = await response.json();
    setDataUsuario(datares);
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
        DASHBOARD
      </Typography>

      <br></br>
      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        DATOS EN TIEMPO REAL
      </Typography>

      <br></br>

      <Grid container spacing={3}>
        <Grid item md={3} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align="center"
          >
            Estado: {dataRealTime.map(({estado}) => estado)}
          </Typography>
        </Grid>
        <Grid item md={3} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align="center"
          >
            Tiempo: {dataRealTime.map(({tiempo}) => tiempo)}
          </Typography>
        </Grid>
      </Grid>

      <br></br>
      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        DATOS DE LA SILLA
      </Typography>

      <br></br>

      <form onSubmit={handleSubmitSilla}>
        <TextField name="silla" label="Id Silla" variant="outlined" type="text" required />
        <Button type="submit">Enviar</Button>
      </form>

      <br></br>

      <Grid container spacing={3}>
        <Grid item md={3} lg={4}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align="center"
          >
            Id Silla: {dataUsuario.map(({id}) => id)}
          </Typography>
        </Grid>
        <Grid item md={3} lg={4}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align="center"
          >
            Usuario: {dataUsuario.map(({user}) => user)}
          </Typography>
        </Grid>
        <Grid item md={3} lg={4}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align="center"
          >
            Ubicacion: {dataUsuario.map(({ubicacion}) => ubicacion)}
          </Typography>
        </Grid>
      </Grid>

      <br></br>

      <Grid container spacing={3}>
        <Grid item md={4} lg={6}>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            align="center"
          >
            Total Tiempo en Uso: {dataDashboardTTime.tiempototal}
          </Typography>
        </Grid>
      </Grid>

      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        Tendencia del Peso
      </Typography>

      <br></br>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Line data={data} options={options} />
        </Grid>
      </Grid>

      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        Dias de Mayor Uso
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Pie data={datapie} />
        </Grid>
      </Grid>

      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        Promedio de veces que se levanta
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar data={dataBar} options={options} />
        </Grid>
      </Grid>

      <br></br>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        Uso promedio por dia
      </Typography>

      <br></br>

      <Grid container spacing={3}>
        {dataDashboardPromedioUseTime
          .filter((row) => row !== null)
          .map((data) => (
            <Grid item xs={12} md={4} lg={6} key={`carddash-${data.dia}`}>
              <Card>
                <CardContent>
                  <Typography
                    component="p"
                    align="center"
                    component="h1"
                    variant="h5"
                  >
                    {(data.dia == "Mon" && "Lunes - (H)") ||
                      (data.dia == "Sun" && "Domingo - (H)") ||
                      (data.dia == "Tue" && "Martes - (H)") ||
                      (data.dia == "Wed" && "Miercoles - (H)") ||
                      (data.dia == "Thu" && "Jueves - (H)") ||
                      (data.dia == "Fri" && "Viernes - (H)") ||
                      (data.dia == "Sat" && "Sabado - (H)")}
                  </Typography>
                </CardContent>
                <div align="center" size="large">
                  <Typography
                    component="p"
                    align="center"
                    component="h1"
                    variant="h5"
                  >
                    {data.tiempopromedio}
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>
      <br></br>
    </>
  );
};

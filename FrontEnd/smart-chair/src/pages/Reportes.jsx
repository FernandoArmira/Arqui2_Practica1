import React, { useState } from "react";
import { Line, Pie, Bar, Scatter } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TablePagination,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export const Reportes = ({
  dataDashboard = [],
  dataDashboardTotalTime = [],
  dataDashboardPromedioUseTime = [],
  dataDashboardTTime = [],
  dataDashboardPromedioLevanta = [],
  dataHistorial = [],
  dataMonitor = [],
  dataHistorialUso = [],
  setDataHistorialUso,
  setDataHistorial,
  setDataRangoHora,
  dataRangoHora = [],
  dataMalSentado = [],
  dataMalSentadoDias = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmitFecha = async (event) => {
    event.preventDefault();
    const date = new Date(event.target.fecha.value);
    let formatted_date =
      date.getDate() +
      1 +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    const response = await fetch("http://localhost:3001/historialuso2", {
      method: "POST",
      body: JSON.stringify({ fecha: formatted_date }),
      headers: { "Content-Type": "application/json" },
    });
    const datares = await response.json();

    setDataHistorialUso(datares);
  };

  const handleSubmitFechaSpectro = async (event) => {
    event.preventDefault();
    const date = new Date(event.target.fecha.value);
    const date2 = new Date(event.target.fecha2.value);
    let formatted_date =
      date.getDate() +
      1 +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    let formatted_date2 =
      date2.getDate() +
      1 +
      "-" +
      (date2.getMonth() + 1) +
      "-" +
      date2.getFullYear();
    const response = await fetch("http://localhost:3001/historialuso", {
      method: "POST",
      body: JSON.stringify({ fecha: formatted_date, fecha2: formatted_date2 }),
      headers: { "Content-Type": "application/json" },
    });
    const datares = await response.json();
    //console.log(datares);
    setDataHistorial(datares);
  };

  const handleSubmitRangoHora = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/rangohora", {
      method: "POST",
      body: JSON.stringify({
        horai: event.target.horai.value,
        horaf: event.target.horaf.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const datares = await response.json();
    setDataRangoHora(datares);
  };

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

  let pesoactual = 0;
  if (dataMonitor[dataMonitor.length - 1] !== undefined) {
    const valSentado = dataMonitor[dataMonitor.length - 1].sentado;
    pesoactual = dataMonitor[dataMonitor.length - 1].peso;
    if (valSentado === 0) pesoactual = 0;
  }

  const v = dataDashboardTotalTime
    .filter((row) => row !== null)
    .sort((a, b) => b.tiempototal - a.tiempototal);

  const datapie = {
    labels: v.filter((row) => row !== null).map(({ dia }) => dia),
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
    .filter((row) => row !== null)
    .sort((a, b) => a.tiempototal - b.tiempototal);

  const datadiasmenos = {
    labels: n.filter((row) => row !== null).map(({ dia }) => dia),
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

  /**
   * DATA PARA SPECTRO GRAFICA HORARIO DE USO
   */

   const media1 = dataMalSentadoDias
   .filter((row) => row !== null)
   .map((row) => (row.media)).filter((row) => row !== undefined);

  const dataSpectro = {
    datasets: [
      {
        label: "HORARIO DE USO - FECHA",
        data: dataHistorial
          .filter(({ tiempo }) => tiempo !== 0)
          .map(({ fecha, tiempo }) => ({ x: fecha, y: tiempo })),
        //y: horariouso.map(({ tiempo }) => tiempo)

        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const dataSpectroHorario = {
    datasets: [
      {
        label: "RANGO HORARIO DE USO",
        data: dataRangoHora
          .filter(({ sentado }) => sentado !== 0)
          .map(({ fecha, peso }) => ({ x: fecha, y: peso })),
        //y: horariouso.map(({ tiempo }) => tiempo)

        backgroundColor: "rgba(255, 199, 132, 1)",
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

  /**
   * VALORES PARA MAL SENTADO POR DIA
   */

   const genData = () => ({
    labels: dataMalSentadoDias.filter((row) => row !== null).map(({ dia }) => dia),
    datasets: [
      {
        label: `Total tiempo mal sentado - Referencia = ${media1[0]}`,
        data: dataMalSentadoDias.filter((row) => row !== null).map(({tiempototal})  => {
          //console.log(media1)
          if(tiempototal > media1) return tiempototal;
          else return tiempototal*-1;
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(100, 159, 64, 0.2)',
          'rgba(153, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(100, 159, 64, 0.2)',
          'rgba(153, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        color="inherit"
        noWrap
        align="center"
      >
        REPORTES
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4} lg={6}>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            align="center"
          >
            Peso de la persona: {pesoactual}
          </Typography>
        </Grid>
      </Grid>
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
          <Bar data={datapie} options={options} />
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
        Dias de Menor Uso
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar data={datadiasmenos} options={options} />
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
        Historial tiempo de uso de la silla
      </Typography>

      <form onSubmit={handleSubmitFecha}>
        <TextField name="fecha" variant="outlined" type="date" required />
        <Button type="submit">Enviar</Button>
      </form>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography component="h1" variant="h5" noWrap>
                        Fecha
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="h1" variant="h5" noWrap>
                        Hora de Inicio
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="h1" variant="h5" noWrap>
                        Hora de Fin
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataHistorialUso
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((row) => row !== undefined)
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell>{row.fecha}</TableCell>
                        <TableCell>{row.horainicial}</TableCell>
                        <TableCell>{row.horafinal}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={dataHistorialUso.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
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
        Horario de Uso
      </Typography>

      <form onSubmit={handleSubmitFechaSpectro}>
        <TextField name="fecha" variant="outlined" type="date" required />
        <TextField name="fecha2" variant="outlined" type="date" required />
        <Button type="submit">Enviar</Button>
      </form>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Scatter data={dataSpectro} options={options} />
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
        Rango de Hora
      </Typography>

      <form onSubmit={handleSubmitRangoHora}>
        <TextField name="horai" variant="outlined" type="time" required />
        <TextField name="horaf" variant="outlined" type="time" required />
        <Button type="submit">Enviar</Button>
      </form>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Scatter data={dataSpectroHorario} options={options} />
        </Grid>
      </Grid>

      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        noWrap
        align="center"
      >
        MAL SENTADO
      </Typography>

      <br></br>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6} key={`carddash-10`}>
          <Card>
            <CardContent>
              <Typography
                component="p"
                align="center"
                component="h1"
                variant="h5"
              >
                Tiempo Total Acumulado
              </Typography>
            </CardContent>
            <div align="center" size="large">
              <Typography
                component="p"
                align="center"
                component="h1"
                variant="h5"
              >
                {dataMalSentado.tiempototal}
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={6} key={`carddash-20`}>
          <Card>
            <CardContent>
              <Typography
                component="p"
                align="center"
                component="h1"
                variant="h5"
              >
                Tiempo Total Actualmente
              </Typography>
            </CardContent>
            <div align="center" size="large">
              <Typography
                component="p"
                align="center"
                component="h1"
                variant="h5"
              >
                {dataMalSentado.tiempototalmalsentado}
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
      <br></br>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar data={genData} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

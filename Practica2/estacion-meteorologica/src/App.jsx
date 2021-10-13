import React from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import {
  ThermometerComponent,
  CompassComponent,
  SpeedmeterComponent,
  HumidityComponent,
  LightComponent,
  MediaComponent,
} from "./components";
import { makeStyles } from "@material-ui/core/styles";
import { URL_API_BACKEND } from "./config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  const [dataStation, setDataStation] = React.useState([]);
  const [dataStatus, setDataStatus] = React.useState([]);
  const [dataMedia, setDataMedia] = React.useState([]);
  const getDataStation = async () => {
    const response = await fetch(`${URL_API_BACKEND}/ultimodato`);
    const allData = await response.json();
    setDataStation(allData);
  };

  const getDataStatus = async () => {
    const response = await fetch(`${URL_API_BACKEND}/statusultimodato`);
    const allData = await response.json();
    setDataStatus(allData);
  };

  const getDataMedia = async () => {
    const response = await fetch(`${URL_API_BACKEND}/medias`);
    const allData = await response.json();
    setDataMedia(allData);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getDataStation().catch((error) => console.error(error));
      getDataStatus().catch((error) => console.error(error));
      getDataMedia().catch((error) => console.error(error));
    }, 30000);

    //console.log(dataStation.humedad);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography component="h1" variant="h6" noWrap>
              ARQUI 2 - PRACTICA 2
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Typography component="h1" variant="h6" noWrap>
            Fecha: {dataStation.fecha}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography component="h1" variant="h6" noWrap>
            Hora: {dataStation.hora}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4} key="1">
          <Typography component="h1" variant="h6" noWrap>
            TEMPERATURA {"°C"}
          </Typography>
          <br />
          <ThermometerComponent value={dataStation.temperatura} />
        </Grid>
        <Grid item xs={12} md={4} lg={4} key="2">
          <Typography component="h1" variant="h6" noWrap>
            DIRECCION
          </Typography>
          <br />
          <CompassComponent value={dataStation.direccion} />
        </Grid>
        <Grid item xs={12} md={4} lg={4} key="3">
          <Typography component="h1" variant="h6" noWrap>
            VELOCIDAD DEL VIENTO KM/H
          </Typography>
          <br />
          <SpeedmeterComponent value={dataStation.viento} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4} key="4">
          <Typography component="h1" variant="h6" noWrap>
            HUMEDAD {"%"}
          </Typography>
          <br />
          <HumidityComponent value={dataStation.humedad} />
        </Grid>
        <Grid item xs={12} md={4} lg={4} key="5">
          <Typography component="h1" variant="h6" noWrap>
            ACTUAL
          </Typography>
          <br />
          <LightComponent value={dataStation} status={dataStatus} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography component="h1" variant="h6" noWrap>
              MEDIAS
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <MediaComponent media={dataMedia} />
      </Grid>
    </Container>
  );
}

export default App;

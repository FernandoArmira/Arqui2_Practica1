import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Configuracion, Reportes, Dashboard, Monitoreo, Home } from "./pages";
import { NavBar, Menu } from "./components";
import clsx from "clsx";
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

export const App = () => {
  const [dataMonitor, setDataMonitor] = React.useState([]);
  const [dataDashboard, setDataDashboard] = React.useState([]);
  const [dataDashboardTotalTime, setDataDashboardTotalTime] = React.useState(
    []
  );
  const [dataDashboardTTime, setDataDashboardTTime] = React.useState([]);
  const [dataDashboardPromedioUseTime, setDataDashboardPromedioUseTime] =
    React.useState([]);
  const [dataDashboardPromedioLevanta, setDataDashboardPromedioLevanta] =
    React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getDataMonitor = async () => {
    const response = await fetch(`${URL_API_BACKEND}/monitoreo`);
    const allData = await response.json();
    setDataMonitor(allData);
  };

  const getDataDashboard = async () => {
    const response = await fetch(`${URL_API_BACKEND}/peso`);
    const allData = await response.json();
    setDataDashboard(allData);
  };

  const getDataDashboardTotalTime = async () => {
    const response = await fetch(`${URL_API_BACKEND}/tiempouso`);
    const allData = await response.json();
    setDataDashboardTotalTime(allData);
  };

  const getDataDashboardTTime = async () => {
    const response = await fetch(`${URL_API_BACKEND}/totaltiempo`);
    const allData = await response.json();
    setDataDashboardTTime(allData);
  };

  const getDataDashboardPromedioUseTime = async () => {
    const response = await fetch(`${URL_API_BACKEND}/promediouso`);
    const allData = await response.json();
    setDataDashboardPromedioUseTime(allData);
  };

  const getDataDashboardPromedioLevanta = async () => {
    const response = await fetch(`${URL_API_BACKEND}/promediolevantadas`);
    const allData = await response.json();
    setDataDashboardPromedioLevanta(allData);
  };

  React.useEffect(() => {
    // const interval = setInterval(() => {
    // }, 90000);
    getDataMonitor().catch((error) => console.error(error));
    getDataDashboard().catch((error) => console.error(error));
    getDataDashboardTotalTime().catch((error) => console.error(error));
    getDataDashboardPromedioUseTime().catch((error) => console.error(error));
    getDataDashboardTTime().catch((error) => console.error(error));
    getDataDashboardPromedioLevanta().catch((error) => console.error(error));

    // return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Menu open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container} maxWidth="lg">
            <Switch>
              <Route exact path="/configuracion">
                <Configuracion />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard
                  dataDashboard={dataDashboard}
                  dataDashboardTTime={dataDashboardTTime}
                  dataDashboardTotalTime={dataDashboardTotalTime}
                  dataDashboardPromedioUseTime={dataDashboardPromedioUseTime}
                  dataDashboardPromedioLevanta={dataDashboardPromedioLevanta}
                />
              </Route>
              <Route exact path="/monitoreo">
                <Monitoreo data={dataMonitor} />
              </Route>
              <Route exact path="/reportes">
                <Reportes
                  dataDashboard={dataDashboard}
                  dataDashboardTTime={dataDashboardTTime}
                  dataDashboardTotalTime={dataDashboardTotalTime}
                  dataDashboardPromedioUseTime={dataDashboardPromedioUseTime}
                  dataDashboardPromedioLevanta={dataDashboardPromedioLevanta}
                />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  );
};

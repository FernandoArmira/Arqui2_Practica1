import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Configuracion, Reportes, Dashboard, Monitoreo, Home } from "./pages";
import { NavBar, Menu } from "./components";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));


export const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
      <div className={classes.root}>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Menu open={open} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      <Container className={classes.container} maxWidth="lg">
        <Switch>
          <Route exact path="/configuracion">
            <Configuracion />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/monitoreo">
            <Monitoreo />
          </Route>
          <Route exact path="/reportes">
            <Reportes />
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

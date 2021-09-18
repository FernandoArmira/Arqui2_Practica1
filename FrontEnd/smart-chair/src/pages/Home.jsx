import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Dashboard,
  Assessment,
  DesktopMac,
} from "@material-ui/icons";
import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Datos = [
  {
    nombre: "Fernando Augusto Armira Ramírez",
    carnet: "201503961",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    nombre: "Luis Alfonso Ordoñez Carrillo",
    carnet: "201603127",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    nombre: "Edi Yovani Tomas Reynoso",
    carnet: "201503783",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    nombre: "Benaventi Bernal Fuentes Roldan",
    carnet: "201021212",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    nombre: "Brayan Mauricio Aroche Boror",
    carnet: "201503918",
    icon: <PersonIcon fontSize="large" />,
  }
];

const naveg = [
  {
    title: "Dashboard",
    path: "/dasboard",
    icon: <Dashboard fontSize="large" />,
  },
  {
    title: "Reportes",
    path: "/reportes",
    icon: <Assessment fontSize="large" />,
  },
  {
    title: "Configuracion",
    path: "/configuracion",
    icon: <SettingsIcon fontSize="large" />,
  },
  {
    title: "Monitoreo",
    path: "/monitoreo",
    icon: <DesktopMac fontSize="large" />,
  },
];

export const Home = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            noWrap
            align="center"
          >
            GRUPO 16
          </Typography>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Nombre
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Carnet
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Datos.map((value) => (
                  <TableRow key={value.carnet}>
                    <TableCell component="th" scope="row" align="right">
                      {value.icon}
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="h1" variant="h6" noWrap>
                        {value.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography component="h1" variant="h6" noWrap>
                        {value.carnet}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {naveg.map((data, index) => (
        <Grid item xs={12} md={4} lg={6} key={`cardhome-${index + 1}`}>
          <Card>
            <CardContent>
              <Typography
                component="p"
                align="center"
                component="h1"
                variant="h5"
              >
                {data.title}
              </Typography>
            </CardContent>
            <div align="center" size="large">
              <RouterLink to={data.path}>
                <IconButton>{data.icon}</IconButton>
              </RouterLink>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon,  Home, Assessment, Dashboard, Settings, DesktopMac } from '@material-ui/icons';
//import BuildIcon from '@material-ui/icons/Build';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const pages_routes = [
  { title: "Dashboard", path: "/dashboard", icon:<Dashboard/> },
  { title: "Monitoreo", path: "/monitoreo", icon:<DesktopMac/> },
  { title: "Reportes", path: "/reportes", icon:<Assessment/> },
  { title: "Configuracion", path: "/configuracion", icon:<Settings/> },
  { title: "Inicio", path: "/", icon:<Home/> },
];

export const Menu = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose && handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {pages_routes.map((page, index) => (
          <ListItem button component={RouterLink} to={page.path} key={`page-${index+1}`}>
            <ListItemIcon>
              {page.icon}          
            </ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

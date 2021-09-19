import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export const Configuracion = ({
  dataUsuario,
  setDataUsuario
}) => {

  /**
   * Handle para enviar formulario 
   */

   const handleSubmitFormulario = async (event) => {
    event.preventDefault();
    const usuario = event.target.usuario.value;
    const silla = event.target.silla.value;
    const ubicacion = event.target.ubicacion.value;
    const response = await fetch("http://localhost:3001/addchair", {
      method: "POST",
      body: JSON.stringify({ user: usuario, id:silla, ubicacion: ubicacion}),
      headers: { "Content-Type": "application/json" },
    });
    setDataUsuario([{ user: usuario, id:silla, ubicacion: ubicacion}]);
  };
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
            CONFIGURACION
          </Typography>
          <br/>
          <br/>
          <form onSubmit={handleSubmitFormulario} align="center">
            <TextField label="Usuario" name="usuario" variant="outlined" type="text" required />
            <br/>
            <br/>
            <TextField label="Id Silla" name="silla" variant="outlined" type="number" required />
            <br/>
            <br/>
            <TextField label="Ubicacion" name="ubicacion" variant="outlined" type="text" required />
            <br/>
            <br/>
            <Button type="submit">Enviar</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

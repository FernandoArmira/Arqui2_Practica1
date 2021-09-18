import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Typography,
  TablePagination,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export const Monitoreo = ({data}) => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Fecha
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Hora
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Sentado
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography component="h1" variant="h4" noWrap>
                      Peso
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.fecha}</TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.sentado == 0 && "Libre." || row.sentado == 1 && "Sentado bien." || row.sentado == 2 && "Sentado mal."}</TableCell>
                      <TableCell>{row.peso}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

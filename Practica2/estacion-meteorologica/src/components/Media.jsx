import React from "react";
import { Grid, CardContent, Typography, IconButton, Card } from "@material-ui/core";
import { FilterDrama, ClearAll, WbSunny, Flare } from "@material-ui/icons";

export const MediaComponent = ({ media = [] }) => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography
              component="p"
              align="center"
              component="h1"
              variant="h5"
            >
              Media de Temperatura: {media.mediatemperatura}
            </Typography>
          </CardContent>
          <div align="center" size="large">
            <IconButton>
              <Flare />
            </IconButton>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography
              component="p"
              align="center"
              component="h1"
              variant="h5"
            >
              Media del Viento: {media.mediaviento}
            </Typography>
          </CardContent>
          <div align="center" size="large">
            <IconButton>
              <ClearAll />
            </IconButton>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography
              component="p"
              align="center"
              component="h1"
              variant="h5"
            >
              Media de la Humedad: {media.mediahumedad}
            </Typography>
          </CardContent>
          <div align="center" size="large">
            <IconButton>
              <FilterDrama />
            </IconButton>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography
              component="p"
              align="center"
              component="h1"
              variant="h5"
            >
              Media de la Luz: {media.modaluz}
            </Typography>
          </CardContent>
          <div align="center" size="large">
            <IconButton>
              <WbSunny />
            </IconButton>
          </div>
        </Card>
      </Grid>
    </>
  );
};

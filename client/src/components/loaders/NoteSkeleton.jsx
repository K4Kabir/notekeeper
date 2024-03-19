import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const NoteSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
    </Grid>
  );
};

export default NoteSkeleton;

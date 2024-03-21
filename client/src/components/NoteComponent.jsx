import { Box, Grid, Typography } from "@mui/material";
import React, { Suspense, lazy } from "react";
const NoteItem = lazy(() => import("./NoteItem"));
import NoteSkeleton from "./loaders/NoteSkeleton";
import InfiniteScroll from "../libs/InfiniteScroll";

const NoteComponent = ({ notes = [], setOpen, setAction, getNotes }) => {
  const renderItem = (data, index) => {
    return (
      <Suspense fallback={<NoteSkeleton />}>
        <Grid item xs={12} sm={6} lg={4}>
          <NoteItem
            getNotes={getNotes}
            note={data}
            index={index}
            setOpen={setOpen}
            setAction={setAction}
          />
        </Grid>
      </Suspense>
    );
  };

  if (notes?.length <= 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          width={"400px"}
          height={"400px"}
          style={{ objectFit: "contain" }}
          src="/images/No.png"
        />
        <Typography variant="h5" textAlign={"center"}>
          No Data Found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid p={4} container>
      <InfiniteScroll
        renderItem={(data, index) => renderItem(data, index)}
        dataArr={notes}
        getData={getNotes}
      />
    </Grid>
  );
};

export default NoteComponent;

import { Box, Grid, Typography } from "@mui/material";
import React, { Suspense, lazy } from "react";
const NoteItem = lazy(() => import("./NoteItem"));
import NoteSkeleton from "./loaders/NoteSkeleton";
import { motion } from "framer-motion";

const NoteComponent = ({ notes = [], setOpen, setAction }) => {
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
      {notes?.map((n, i) => {
        return (
          <Suspense fallback={<NoteSkeleton />}>
            <Grid key={i} item xs={12} sm={6} lg={4}>
              <NoteItem
                key={i}
                note={n}
                setOpen={setOpen}
                setAction={setAction}
              />
            </Grid>
          </Suspense>
        );
      })}
    </Grid>
  );
};

export default NoteComponent;

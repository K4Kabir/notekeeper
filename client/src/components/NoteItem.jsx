import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import jwtAxios from "../libs/jwtAxios";
import { toast } from "sonner";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allNotes, noteAtom } from "../context/atoms";
import moment from "moment";
import Favourite from "./Favourite";
import { motion } from "framer-motion";

const NoteItem = ({ note, setOpen, setAction, getNotes }) => {
  const [loading, setLoading] = useState(false);
  const setCreateNote = useSetRecoilState(noteAtom);

  return (
    <motion.div
      layout
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ x: 100 }}
    >
      <Card
        sx={{
          m: 2,
          maxHeight: "25rem",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Favourite
          data={note || {}}
          styles={{ position: "absolute", right: 1, top: 1 }}
          selected={note?.isFavourite}
          onSuccess={async () => {
            getNotes();
          }}
        />
        <CardActionArea
          onClick={async () => {
            setAction({
              add: false,
              edit: true,
            });
            const res = await jwtAxios.get(`/Note/getById/${note?._id}`);
            if (res.data.success) {
              setCreateNote(res.data.message);
            } else {
              toast.error(res.data.message);
            }
            setOpen(true);
          }}
        >
          {note?.Image?.url && (
            <CardMedia
              component="img"
              height="140"
              image={note?.Image?.url}
              alt="green iguana"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {note?.title}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: note?.content }}
              variant="body2"
              color="text.secondary"
            ></Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ m: 2 }} variant="caption">
            {moment(note?.createdAt).fromNow()}
            <br />
            {moment(note?.createdAt).format("DD-MM-YYYY")}
          </Typography>
          {loading ? (
            <CircularProgress size={25} sx={{ m: 2 }} />
          ) : (
            <Tooltip title="Delete">
              <IconButton
                onClick={async () => {
                  try {
                    setLoading(true);
                    let res = await jwtAxios.delete(
                      `/Note/deleteNote/${note?._id}`
                    );
                    setLoading(false);
                    if (res.data.success) {
                      toast.success("Note Deleted Successfully");
                      getNotes();
                    } else {
                      toast.error(res.data.message);
                    }
                  } catch (error) {
                    toast.error(error.message || "Something went wrong");
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Card>
    </motion.div>
  );
};

export default NoteItem;

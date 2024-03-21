import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { allNotes, noteAtom } from "../../context/atoms";
import jwtAxios from "../../libs/jwtAxios";
import EditorTiny from "../Editor/JoditEditor";
import LoadingButton from "../LoadingButton";

const CreateDialog = ({ action, open, setOpen, getNotes }) => {
  const [note, setNote] = useRecoilState(noteAtom);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [SampleNote, setSampleNote] = useRecoilState(allNotes);

  const handleInput = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={open}
      onClose={() => {
        setNote({});
        setOpen(false);
        setImage(null);
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData();
          formData.append("title", note.title);
          formData.append("content", note.content);
          formData.append("Image", image);
          jwtAxios
            .post("/Note/create", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              setLoading(false);
              if (res.data.success) {
                toast.success("Saved");
                setOpen(false);
                setNote({});
                setImage(null);
                getNotes();
              } else {
                toast.error(res.data.message);
                setImage(null);
              }
            })
            .catch((e) => {
              setLoading(false);
              toast.error(e.message || "Something went wrong");
              setImage(null);
              setNote({});
            });
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              {action.add ? "Create" : "Update"}
            </Typography>
            <IconButton
              onClick={() => {
                setOpen(false);
                setNote({});
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack mt={2} spacing={"1rem"}>
            <TextField
              name="title"
              onChange={(e) => handleInput(e)}
              value={note.title}
              required
              label="Title"
              type="text"
            />
            {/* <TextField
              name="content"
              onChange={(e) => handleInput(e)}
              multiline
              rows={7}
              value={note.content}
              label="Content"
              type="text"
            /> */}
            <input
              accept="jpg jpeg png"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <EditorTiny
              onChange={(data) => {
                setNote({
                  ...note,
                  content: data,
                });
              }}
              value={note?.content}
            />
            {/* <Editor /> */}
            <LoadingButton
              type={"submit"}
              loading={loading}
              name={action.add ? "Submit" : "Update"}
              icon={""}
            />
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateDialog;

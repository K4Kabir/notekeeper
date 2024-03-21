import AddCircleIcon from "@mui/icons-material/AddCircle";
import DraftsIcon from "@mui/icons-material/Drafts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Chip,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import AppProvider from "../components/AppProvider";
import CreateDialog from "../components/Dialogs/CreateDialog";
import { useRecoilValue, useRecoilState } from "recoil";
import { userAtom, allNotes } from "../context/atoms";
import SearchIcon from "@mui/icons-material/Search";
import "../index.css";
import jwtAxios from "../libs/jwtAxios";
import { toast } from "sonner";
import useDebounce from "../hooks/userDebounce";
const NoteComponent = lazy(() => import("../components/NoteComponent"));

const items = [
  {
    name: "Favourites",
    icon: <FavoriteIcon />,
  },
];

const Dashboard = () => {
  const [SampleNote, setSampleNote] = useRecoilState(allNotes);
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    const getNotes = async () => {
      try {
        let response = await jwtAxios.get("/Note/getAll?page=1&limit=10");
        if (response.data.success) {
          setSampleNote(response.data.message);
        } else {
          setSampleNote(null);
        }
      } catch (error) {
        setSampleNote(null);
      }
    };
    getNotes();
  }, []);

  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({ add: false, edit: false });
  const handleSearch = async (e) => {
    try {
      let response = await jwtAxios.get(
        `/Note/search/${e.target.value || "All"}`
      );
      if (response.data.success) {
        setSampleNote(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // const dfn = useDebounce(handleSearch, 500);

  return (
    <>
      <Grid container>
        <Grid height={"100vh"} display={{ xs: "none", lg: "block" }} lg={2}>
          <Paper sx={{ height: "100%" }}>
            <SidebarItems />
          </Paper>
        </Grid>
        <Grid
          overflow={"auto"}
          position={"relative"}
          height={"100vh"}
          xs={12}
          sm={12}
          lg={10}
        >
          <TextField
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 2 }} />,
            }}
            onChange={(e) => handleSearch(e)}
            fullWidth
            sx={{ py: 3, px: 2 }}
            placeholder="Search"
          />
          <NoteComponent
            notes={SampleNote}
            setAction={setAction}
            setOpen={setOpen}
            setNotes={setSampleNote}
          />
          <IconButton
            onClick={() => setMobile(!mobile)}
            sx={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              display: { xs: "block", sm: "block", lg: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            sx={{
              position: "fixed",
              right: "1.5rem",
              bottom: "1.5rem",
            }}
          >
            <AddCircleIcon
              onClick={() => {
                setOpen(true);
                setAction({
                  add: true,
                  edit: false,
                });
              }}
              fontSize={"large"}
            />
          </IconButton>
        </Grid>
        <Drawer open={mobile} onClose={() => setMobile(false)}>
          <SidebarItems w={"50%"} />
        </Drawer>
        <CreateDialog action={action} open={open} setOpen={setOpen} />
      </Grid>
    </>
  );
};

const SidebarItems = (w = "100%") => {
  return (
    <Stack width={w} p={"1rem"} spacing={"1rem"}>
      {items.map((f, index) => {
        return (
          <Stack
            key={index}
            sx={{ "&:hover": { bgcolor: "grey" }, cursor: "pointer" }}
            direction={"row"}
            alignItems={"center"}
            spacing={"0.5rem"}
            p={2}
          >
            {f.icon}
            <Typography>{f.name}</Typography>
            <Chip label="9" color="primary" variant="outlined" />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default AppProvider(Dashboard);

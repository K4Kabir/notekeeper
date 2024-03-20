import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { Theme } from "../context/ColorProvide";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function ThemeSwitcher() {
  const theme = useTheme();
  const { dark, setDark } = useContext(Theme);
  return (
    <Box>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          setDark(!dark);
          localStorage.setItem("theme", dark);
        }}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default ThemeSwitcher;

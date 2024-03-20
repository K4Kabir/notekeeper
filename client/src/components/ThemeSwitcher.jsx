import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { Theme } from "../context/ColorProvide";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useRecoilState } from "recoil";
import { themeAtom } from "../context/atoms";

function ThemeSwitcher() {
  const theme = useTheme();
  const [dark, setDark] = useRecoilState(themeAtom);

  useEffect(() => {
    localStorage.setItem("theme", dark);
  }, [dark]);

  return (
    <Box>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          setDark(!dark);
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

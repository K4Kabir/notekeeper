import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import { userAtom } from "../context/atoms";
import { useRecoilState } from "recoil";
import jwtAxios from "../libs/jwtAxios";

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <Box sx={{ height: "4rem" }}>
      <AppBar sx={{ height: "4rem" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {user.isAuthenticated
              ? "? Welcome back" + " " + user?.user?.username
              : "NoteKeeper"}
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <ThemeSwitcher />

            {user.isAuthenticated && (
              <>
                <Avatar />
                <IconButton>
                  <LogoutIcon
                    onClick={() => {
                      jwtAxios
                        .post("/User/logout")
                        .then((res) => {
                          if (res.data.success) {
                            setUser({
                              isAuthenticated: false,
                              user: {},
                            });
                          }
                        })
                        .catch((err) => {
                          alert(err.message);
                        });
                    }}
                  />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import { userAtom } from "../context/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import jwtAxios from "../libs/jwtAxios";
import { allNotes } from "../context/atoms";

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const setAllNote = useSetRecoilState(allNotes);
  return (
    <Box sx={{ height: "4rem" }}>
      <AppBar sx={{ height: "4rem" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {user.isAuthenticated
              ? "Welcome back" + " " + user?.user?.username
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
                        .then(() => {
                          setAllNote([]);
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

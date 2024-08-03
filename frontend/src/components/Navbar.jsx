import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import profileImage from "../assets/Profile.jpeg"; 
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from "@mui/material";

const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen
}
) => {
    const dispatch = useDispatch();
    const theme = useTheme();

  return <AppBar
    sx={{
        position: "static",
        background: "none",
        boxShadow: "none"
    }}
  >
    <Toolbar sx={{justifyContent: "space-between"}}>
        <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
            </IconButton>
            <FlexBetween
                bgcolor={theme.palette.background.search}
                borderRadius={"9px"}
                p={"0.1rem 0rem"}
                border={"1px solid #000"}
            >
                <IconButton>
                    <Search />
                </IconButton>
                <InputBase placeholder="Search" />
            </FlexBetween>
        </FlexBetween>

        <FlexBetween gap={"1.5rem"}>
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                    <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}

            </IconButton>
        </FlexBetween>
    </Toolbar>
  </AppBar>;
};

export default Navbar;
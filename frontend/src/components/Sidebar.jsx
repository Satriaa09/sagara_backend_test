import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import companyImage from "../assets/sagara.jpeg";

const navItems = [
  {
    text: "MENU",
    icon: null,
  },
  {
    text: "Dashboard",
    icon: <GridViewOutlinedIcon />,
  },
  {
    text: "Input",
    icon: <SchoolOutlinedIcon />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component={"nav"}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width={"100%"}>
            <Box m={"1.5rem 2rem 2rem 3rem"}>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                  <Box
                    component={"img"}
                    alt="company"
                    src={companyImage}
                    width={"50%"}
                    marginLeft={"-20px"}
                    marginTop={"20px"}
                  />
                  <Typography
                    variant="company"
                    fontWeight={"bold"}
                    sx={{ color: "#ffffff" }}
                    marginTop={"1.2rem"}
                  >
                    SAGARA TECH
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton
                    onClick={() => setIsSidebarOpen(!setIsSidebarOpen)}
                    sx={{ color: "#d3d3d3", ml: "3rem" }} // Ensure button color is consistent
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem", color: "#d3d3d3" }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.mode === 'dark'
                              ? theme.palette.primary[400]
                              : theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.primary[600],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ color: active === lcText ? theme.palette.primary[600] : "#D3D3D3" }} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

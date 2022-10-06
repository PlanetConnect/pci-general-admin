import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";

import { closedMixin, openedMixin } from "./data/MainAppDrawerMixins";
import MainMenuItems from "./MainMenuItems";

interface MainAppDrawerProps {
  isDrawerOpen: boolean;
  drawerWidth: number;
  onClick: (param: React.MouseEvent<HTMLElement>) => void;
}

let drawerWidth: number;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainAppDrawer = (props: MainAppDrawerProps) => {
  const theme = useTheme();
  drawerWidth = props.drawerWidth;
  return (
    <Drawer variant="permanent" open={props.isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={props.onClick}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MainMenuItems isDrawerOpen={props.isDrawerOpen} />
    </Drawer>
  );
};

export default MainAppDrawer;

import React from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";

import { MainSearch } from "../../search";
import { NotificationIconBadge } from "../../notification";
import { SelectShowOption } from "../../show";
import { UserIconBadge } from "../../user";

interface AppBarProps extends MuiAppBarProps {
  isDrawerOpen?: boolean;
  drawerWidth?: number;
}

interface MainAppBarProps {
  isDrawerOpen: boolean;
  drawerWidth: number;
  onClick: (param: React.MouseEvent<HTMLElement>) => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isDrawerOpen" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, isDrawerOpen, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainAppBar = (props: MainAppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        isDrawerOpen={props.isDrawerOpen}
        drawerWidth={props.drawerWidth}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onClick}
            edge="start"
            sx={{
              marginRight: 5,
              ...(props.isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <SelectShowOption />
          <Box sx={{ flexGrow: 1 }} />
          <MainSearch />
          <Box sx={{ display: { md: "flex" }, marginRight: 5 }}>
            <NotificationIconBadge />
            <UserIconBadge />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;

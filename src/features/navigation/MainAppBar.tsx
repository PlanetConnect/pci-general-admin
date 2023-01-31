import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Grid, Popover } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import { userManager } from "~/features/auth/utils/userManager";

import { NotificationIconBadge } from "../notification";
import { MainSearch } from "../search";
import { SelectShowOption } from "../show";
import { UserIconBadge } from "../user";

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
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
            <UserIconBadge onClick={handleClick} />
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        elevation={0}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            borderRadius: 0,
            padding: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::after": {
              backgroundColor: "#fff",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              left: 60,
              transform: "rotate(45deg)",
              top: -16,
              boxShadow: "-2px 2px 2px 0 rgba( 178, 178, 178, .4 )",
            },
          }}
        />
        <Grid
          container
          p={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            zIndex: 1000,
            boxShadow: "-2px 2px 2px 2px rgba( 178, 178, 178, .4 )",
          }}
        >
          <Button
            variant="text"
            startIcon={<PersonIcon />}
            onClick={() => {
              console.log("profile button clicked");
              handleClose();

              navigate("/profile");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 1,
              textTransform: "none",
            }}
          >
            Profile
          </Button>

          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={async () => {
              const user = await dispatch(authLogout());
              handleClose();
              navigate("/login");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 1,
              textTransform: "none",
            }}
          >
            Logout
          </Button>
        </Grid>
      </Popover>
    </Box>
  );
};

export default MainAppBar;

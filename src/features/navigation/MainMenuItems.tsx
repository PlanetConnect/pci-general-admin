import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  logoutRoutes,
  topLevelRoutes,
  withShowRoutes,
} from "~/app/data/routes";
import { AppDispatch } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import { fetchAccessToken } from "~/features/auth/actions/fetchAccessToken";

import MenuItem from "./data/MenuItem";

interface MainMenuItemProps {
  isDrawerOpen: boolean;
}

interface MenuItemsProps {
  menuItems: MenuItem[];
}

let isDrawerOpen: boolean;

const MenuItems = (props: MenuItemsProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <React.Fragment>
      {props.menuItems.map((item: MenuItem) => {
        return (
          <ListItem
            button
            key={item.label}
            disablePadding
            sx={{ display: "block" }}
            component={Link}
            to={item.path}
            onClick={async () => {
              if (item.label === "Logout") {
                console.log("logout");
                const user = await dispatch(authLogout());
                console.log(
                  "🚀 ~ file: Login.tsx:35 ~ handleSubmit ~ user",
                  user
                );
              }
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </React.Fragment>
  );
};

const MainMenuItems = (props: MainMenuItemProps) => {
  isDrawerOpen = props.isDrawerOpen;
  return (
    <List>
      <MenuItems menuItems={topLevelRoutes} />
      <Divider />
      <MenuItems menuItems={withShowRoutes} />
      <Divider />
      <MenuItems menuItems={logoutRoutes} />
    </List>
  );
};
export default MainMenuItems;

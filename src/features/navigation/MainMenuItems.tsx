import React from "react";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuItem from "./data/MenuItem";

import { topLevelRoutes, withShowRoutes } from "../../app/data/routes";

interface MainMenuItemProps {
  isDrawerOpen: boolean;
}

interface MenuItemsProps {
  menuItems: MenuItem[];
}

let isDrawerOpen: boolean;

const MenuItems = (props: MenuItemsProps) => {
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
    </List>
  );
};
export default MainMenuItems;

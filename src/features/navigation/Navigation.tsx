import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MainAppbar from "./MainAppBar";
import MainAppDrawer from "./MainAppDrawer";
import {
  closeDrawer,
  openDrawer,
  selectDrawerWidth,
  selectIsDrawerOpen,
} from "./mainAppDrawerSlice";

const Navigation = () => {
  const mainAppDrawerWidth = useAppSelector(selectDrawerWidth);
  const isMainAppDrawerOpen = useAppSelector(selectIsDrawerOpen);

  const dispatch = useAppDispatch();

  const handleDrawerClick = () => {
    isMainAppDrawerOpen ? dispatch(closeDrawer()) : dispatch(openDrawer());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainAppbar
        isDrawerOpen={isMainAppDrawerOpen}
        drawerWidth={mainAppDrawerWidth}
        onClick={handleDrawerClick}
      />
      <MainAppDrawer
        isDrawerOpen={isMainAppDrawerOpen}
        drawerWidth={mainAppDrawerWidth}
        onClick={handleDrawerClick}
      />
    </Box>
  );
};

export default Navigation;

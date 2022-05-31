import { Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useAppSelector } from "../../hooks";

import { Navigation, selectIsDrawerOpen } from "../../../features/navigation";

const Main = () => {
  const theme = useTheme();
  const isMainAppDrawerOpen = useAppSelector(selectIsDrawerOpen);

  return (
    <div className="main">
      <Navigation />
      <Box
        sx={{
          padding: 13,
          display: "flex",
          ...(isMainAppDrawerOpen && {
            marginLeft: 22,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default Main;

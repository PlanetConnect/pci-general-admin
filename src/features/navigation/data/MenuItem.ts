import { SvgIconProps } from "@mui/material";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactElement<SvgIconProps>;
}

export default MenuItem;

import { SvgIconProps } from "@mui/material";

interface TabItem {
  icon?: React.ReactElement<SvgIconProps>;
  label: string;
  value: string;
  component: React.ReactNode;
}

export default TabItem;

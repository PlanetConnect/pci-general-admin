import Analytics from "@mui/icons-material/Analytics";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import Business from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Security from "@mui/icons-material/Security";
import TableBarRoundedIcon from "@mui/icons-material/TableBarRounded";
import TextFields from "@mui/icons-material/TextFields";

import { MenuItem } from "../../features/navigation";

export const topLevelRoutes: MenuItem[] = [
  {
    label: "Shows",
    path: "/shows",
    icon: <CalendarMonthIcon />,
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: <Business />,
  },
  {
    label: "Contacts",
    path: "/contacts",
    icon: <ContactMailIcon />,
  },
  {
    label: "Security",
    path: "/security",
    icon: <Security />,
  },
];

export const withShowRoutes: MenuItem[] = [
  {
    label: "Attendees",
    path: "/attendees",
    icon: <ConnectWithoutContactIcon />,
  },
  {
    label: "Abstracts",
    path: "/abstracts",
    icon: <ArticleRoundedIcon />,
  },
  {
    label: "Exhibitions",
    path: "/exhibitions",
    icon: <TableBarRoundedIcon />,
  },
  {
    label: "Forms",
    path: "/forms",
    icon: <TextFields />,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <Analytics />,
  },
];

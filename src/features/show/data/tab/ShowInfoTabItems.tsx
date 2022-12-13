import ConstructionIcon from "@mui/icons-material/Construction";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { TabItem } from "../../../../app/templates/tab";
import EditShowConfig from "../../EditShowConfig";
import EditShowInfo from "../../EditShowInfo";

export const useShowTabInfoItems = () => {
  const tabItems: TabItem[] = [
    {
      icon: <EventNoteIcon />,
      label: "General Info",
      value: "generalInfo",
      component: <EditShowInfo />,
    },
    {
      icon: <ConstructionIcon />,
      label: "Show Config",
      value: "showConfig",
      component: <EditShowConfig />,
    },
  ];

  return tabItems;
};

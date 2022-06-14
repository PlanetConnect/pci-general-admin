import ConstructionIcon from "@mui/icons-material/Construction";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { TabItem } from "../../../../app/templates/tab";

import EditShowInfo from "../../EditShowInfo";
import EditShowConfig from "../../EditShowConfig";

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

import ConstructionIcon from "@mui/icons-material/Construction";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import { TabItem } from "../../../app/templates/tab/containers/IconedTab";

import EditShowInfo from "../components/EditShowInfo";
import Show from "./Show";

interface useShowTabInfoItemsProps {
  show: Show;
}

export const useShowTabInfoItems = (props: useShowTabInfoItemsProps) => {
  const tabItems: TabItem[] = [
    {
      icon: <EventNoteIcon />,
      label: "General Info",
      value: "generalInfo",
      component: <EditShowInfo show={props.show} />,
    },
    {
      icon: <ConstructionIcon />,
      label: "Show Config",
      value: "showConfig",
      component: <EditShowInfo show={props.show} />,
    },
    {
      icon: <TextFieldsIcon />,
      label: "Forms",
      value: "forms",
      component: <EditShowInfo show={props.show} />,
    },
  ];

  return tabItems;
};

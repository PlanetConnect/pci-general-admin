import { TabItem } from "../../../../app/templates/tab/";

import FormEntries from "../../FormEntries";
import FormFields from "../../FormFields";
import FormSettings from "../../FormSettings";
import FormNotifications from "../../FormNotifications";

export const useFormTabInfoItems = () => {
  const tabItems: TabItem[] = [
    {
      label: "Form Settings",
      value: "settings",
      component: <FormSettings />,
    },
    {
      label: "Fields",
      value: "fields",
      component: <FormFields />,
    },
    // {
    //   label: "Form Notifications",
    //   value: "notifications",
    //   component: <FormNotifications />,
    // },
    // {
    //   label: "Entries",
    //   value: "entries",
    //   component: <FormEntries />,
    // },
  ];

  return tabItems;
};

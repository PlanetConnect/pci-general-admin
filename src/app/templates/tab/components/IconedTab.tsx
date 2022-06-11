import React, { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import TabItem from "../data/TabItem";

interface IconedTabProps {
  selectedIndex: string;
  tabItems: TabItem[];
}

const IconedTab = (props: IconedTabProps) => {
  const [value, setValue] = useState(props.selectedIndex);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            {props.tabItems.map((item: TabItem) => {
              return (
                <Tab
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </TabList>
        </Box>

        {props.tabItems.map((item: TabItem) => {
          return (
            <TabPanel key={item.value} value={item.value}>
              {item.component}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};
export default IconedTab;

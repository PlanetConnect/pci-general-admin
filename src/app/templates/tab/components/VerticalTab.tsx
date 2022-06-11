import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import TabItem from "../data/TabItem";

interface VerticalTabProps {
  selectedIndex: string;
  tabItems: TabItem[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function tabProps(index: string) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      sx={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  );
}

const VerticalTab = (props: VerticalTabProps) => {
  const [value, setValue] = useState(props.selectedIndex);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons={false}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {props.tabItems.map((item: TabItem) => {
            return (
              <Tab
                key={item.value}
                icon={item.icon}
                label={item.label}
                value={item.value}
                {...tabProps(item.value)}
              />
            );
          })}
        </Tabs>
        {props.tabItems.map((item: TabItem) => {
          return (
            <TabPanel key={item.value} index={value} value={item.value}>
              {item.component}
            </TabPanel>
          );
        })}
      </Stack>
    </Box>
  );
};

export default VerticalTab;

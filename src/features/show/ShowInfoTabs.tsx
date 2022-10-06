import { PaperContent } from "~/app/templates/content";
import { IconedTab } from "~/app/templates/tab";

import { useShowTabInfoItems } from "./data/tab/ShowInfoTabItems";

const ShowInfoTabs = () => {
  const tabs = useShowTabInfoItems();
  const selectedTab = "generalInfo";

  return (
    <PaperContent>
      <IconedTab selectedIndex={selectedTab} tabItems={tabs} />
    </PaperContent>
  );
};

export default ShowInfoTabs;

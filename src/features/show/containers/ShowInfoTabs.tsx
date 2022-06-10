import { useShowTabInfoItems } from "../data/tab/showInfoTabItems";

import { IconedTab } from "../../../app/templates/tab";
import { PaperContent } from "../../../app/templates/content";

const ShowInfoTabs = () => {
  const tabs = useShowTabInfoItems();
  let selectedTab = "generalInfo";

  return (
    <PaperContent>
      <IconedTab selectedIndex={selectedTab} tabItems={tabs} />
    </PaperContent>
  );
};

export default ShowInfoTabs;

import { useFormTabInfoItems } from "./FormInfoTabItems";

import { PaperContent, Title } from "../../app/templates/content";
import { VerticalTab } from "../../app/templates/tab";

const FormInfoTabs = () => {
  const tabs = useFormTabInfoItems();
  let selectedTab = "settings";

  return (
    <PaperContent>
      <Title>Form Information</Title>
      <VerticalTab selectedIndex={selectedTab} tabItems={tabs} />
    </PaperContent>
  );
};

export default FormInfoTabs;

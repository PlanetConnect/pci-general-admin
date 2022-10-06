import { PaperContent, Title } from "~/app/templates/content";
import { VerticalTab } from "~/app/templates/tab";

import { useFormTabInfoItems } from "./FormInfoTabItems";

const FormInfoTabs = () => {
  const tabs = useFormTabInfoItems();
  const selectedTab = "settings";

  return (
    <PaperContent>
      <Title>Form Information</Title>
      <VerticalTab selectedIndex={selectedTab} tabItems={tabs} />
    </PaperContent>
  );
};

export default FormInfoTabs;

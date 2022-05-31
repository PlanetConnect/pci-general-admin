import { useShowTabInfoItems } from "../data/showInfoTabItems";

import { IconedTab } from "../../../app/templates/tab";
import { PaperContent } from "../../../app/templates/content/";

import Show from "../data/Show";

const show: Show = {
  showId: "06a5ba5a-4f15-4147-a110-ec33187c4bff",
  name: "Merck Technology Symposium 2022",
  year: 2022,
  startDate: "2022-03-11",
  endDate: "2022-03-11",
  setup: "Hybrid",
  isActive: true,
  facility: "Nuclear Silo",
  street: "test",
  city: "Longhorn",
  state: "New Jersey",
  zip: "08722",
  country: "United States",
  description: "The Description of my Show!",
  createdTime: "2022-04-15 09:39:34.120772",
  modifiedTime: "2022-04-15 09:39:34.120772",
};

const ShowInfo = () => {
  const tabs = useShowTabInfoItems({ show });

  return (
    <PaperContent>
      <IconedTab selectedIndex="generalInfo" tabItems={tabs} />
    </PaperContent>
  );
};

export default ShowInfo;

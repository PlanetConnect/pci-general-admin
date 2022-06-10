import { Route, Routes } from "react-router-dom";

import { Main } from "./layouts/";

import { NotFound } from "./templates/content/";

import { AbstractList } from "../features/abstract";
import { AttendeeList } from "../features/attendee";
import { ContactList } from "../features/contact";
import { ExhibitionList } from "../features/exhibition";
import { ShowList, ShowInfoTabs } from "../features/show";
import { FormInfo, FormList } from "../features/form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {/* Abstract Routes */}
        <Route path="abstracts" element={<AbstractList />} />
        {/* Attendee Routes */}
        <Route path="attendees" element={<AttendeeList />} />
        {/* Contact Routes */}
        <Route path="contacts" element={<ContactList />} />
        {/* Exhibition Routes */}
        <Route path="exhibitions" element={<ExhibitionList />} />
        {/* Show Routes */}
        <Route path="shows" element={<ShowList />} />
        <Route path="shows/:showId" element={<ShowInfoTabs />} />
        {/* Form Routes */}
        <Route path="forms" element={<FormList />} />
        <Route path="forms/:formId" element={<FormInfo />} />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import { startupAsync } from "~/app/actions/startupAsync";
import { AppDispatch, useAppDispatch } from "~/app/store";
import { getCognitoUser } from "~/features/auth/loginSlice";

import { AbstractList, EditAbstractInfo } from "../features/abstract";
import { AccountList, EditAccountInfo } from "../features/account";
import { AttendeeList, EditAttendeeInfo } from "../features/attendee";
import { Login, LoginMfa, LoginNewPassword, Signup } from "../features/auth";
import { ContactList, EditContactInfo } from "../features/contact";
import { EditExhibitionInfo, ExhibitionList } from "../features/exhibition";
import { FormInfoTabs, FormList } from "../features/form";
import { EditRoleInfo, RoleList } from "../features/security";
import { ShowInfoTabs, ShowList } from "../features/show";
import { Main } from "./layouts/";
import { NotFound } from "./templates/content/";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  console.log("app.tsx");
  const user = useSelector(getCognitoUser);

  useEffect(() => {
    (async () => {
      const result = await dispatch(startupAsync(user));
      if (result === "no user") {
        navigate("/login");
      }
      setInitialized(true);
    })();
  }, []);
  if (!initialized) {
    return null;
  }
  return (
    <Routes>
      {/* Login Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/login/mfa" element={<LoginMfa />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login/newPassword" element={<LoginNewPassword />} />
      <Route path="/" element={<Main />}>
        {/* Abstract Routes */}
        <Route path="abstracts" element={<AbstractList />} />
        <Route path="abstracts/:abstractId" element={<EditAbstractInfo />} />
        {/* Account Routes */}
        <Route path="accounts" element={<AccountList />} />
        <Route path="accounts/:accountId" element={<EditAccountInfo />} />
        {/* Attendee Routes */}
        <Route path="attendees" element={<AttendeeList />} />
        <Route path="attendees/:attendeeId" element={<EditAttendeeInfo />} />
        {/* Contact Routes */}
        <Route path="contacts" element={<ContactList />} />
        <Route path="contacts/:contactId" element={<EditContactInfo />} />
        {/* Exhibition Routes */}
        <Route path="exhibitions" element={<ExhibitionList />} />
        <Route
          path="exhibitions/:exhibitionId"
          element={<EditExhibitionInfo />}
        />
        {/* Show Routes */}
        <Route path="shows" element={<ShowList />} />
        <Route path="shows/:showId" element={<ShowInfoTabs />} />
        {/* Form Routes */}
        <Route path="forms" element={<FormList />} />
        <Route path="forms/:formId" element={<FormInfoTabs />} />
        {/* Security Routes */}
        <Route path="security" element={<RoleList />} />
        <Route path="roles/:roleId" element={<EditRoleInfo />} />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import { startupAsync } from "~/app/actions/startupAsync";
import { AppDispatch, useAppDispatch } from "~/app/store";
import { getCognitoUser } from "~/features/auth/authSlice";
import ProtectedRoute from "~/features/auth/ProtectedRoute";

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

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(startupAsync());
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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      >
        {/* Abstract Routes */}
        <Route
          path="abstracts"
          element={
            <ProtectedRoute>
              <AbstractList />
            </ProtectedRoute>
          }
        />
        <Route
          path="abstracts/:abstractId"
          element={
            <ProtectedRoute>
              <EditAbstractInfo />
            </ProtectedRoute>
          }
        />
        {/* Account Routes */}
        <Route
          path="accounts"
          element={
            <ProtectedRoute>
              <AccountList />
            </ProtectedRoute>
          }
        />
        <Route
          path="accounts/:accountId"
          element={
            <ProtectedRoute>
              <EditAccountInfo />
            </ProtectedRoute>
          }
        />
        {/* Attendee Routes */}
        <Route
          path="attendees"
          element={
            <ProtectedRoute>
              <AttendeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="attendees/:attendeeId"
          element={
            <ProtectedRoute>
              <EditAttendeeInfo />
            </ProtectedRoute>
          }
        />
        {/* Contact Routes */}
        <Route
          path="contacts"
          element={
            <ProtectedRoute>
              <ContactList />
            </ProtectedRoute>
          }
        />
        <Route
          path="contacts/:contactId"
          element={
            <ProtectedRoute>
              <EditContactInfo />
            </ProtectedRoute>
          }
        />
        {/* Exhibition Routes */}
        <Route
          path="exhibitions"
          element={
            <ProtectedRoute>
              <ExhibitionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="exhibitions/:exhibitionId"
          element={
            <ProtectedRoute>
              <EditExhibitionInfo />
            </ProtectedRoute>
          }
        />
        {/* Show Routes */}
        <Route
          path="shows"
          element={
            <ProtectedRoute>
              <ShowList />
            </ProtectedRoute>
          }
        />
        <Route
          path="shows/:showId"
          element={
            <ProtectedRoute>
              <ShowInfoTabs />
            </ProtectedRoute>
          }
        />
        {/* Form Routes */}
        <Route
          path="forms"
          element={
            <ProtectedRoute>
              <FormList />
            </ProtectedRoute>
          }
        />
        <Route
          path="forms/:formId"
          element={
            <ProtectedRoute>
              <FormInfoTabs />
            </ProtectedRoute>
          }
        />
        {/* Security Routes */}
        <Route
          path="security"
          element={
            <ProtectedRoute>
              <RoleList />
            </ProtectedRoute>
          }
        />
        <Route
          path="roles/:roleId"
          element={
            <ProtectedRoute>
              <EditRoleInfo />
            </ProtectedRoute>
          }
        />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

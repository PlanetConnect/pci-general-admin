import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { useAuth } from "oidc-react";
import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "~/app/hooks";
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { getUser, setSavedLoginPath, setUser } from "~/features/auth/userSlice";
import { userManager } from "~/features/auth/utils/userManager";
import { queryApi } from "~/services/queryApi";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("🚀 ~ file: ProtectedRoute.tsx:11 ~ location", location.search);
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  console.log("🚀 ~ file: ProtectedRoute.tsx:14 ~ userManager", userManager);
  // const auth = useAuth();
  // console.log(
  //   "🚀 ~ file: ProtectedRoute.tsx:16 ~ auth.userData",
  //   auth.userData
  // );

  const params = new URLSearchParams(location.search);
  const error_description = params.get("error_description");
  const error = params.get("error");

  // useEffect(() => {
  //   if (!auth.isLoading) {
  //     if (!auth.userData) {
  //       console.log("NOT LOGGED IN, Redirecting to login");
  //       dispatch(setSavedLoginPath(location.pathname));
  //       navigate("/login", { replace: true });
  //     } else {
  //       console.log("LOGGED IN SAVING TOKENS");
  //       dispatch(setAccessToken(auth.userData.access_token));
  //       dispatch(setRefreshToken(auth.userData.refresh_token as string));
  //       dispatch(setUsername(auth.userData.profile.email as string));

  //       // get me from API
  //       dispatch(queryApi.endpoints.getMe.initiate()).then((me) => {
  //         console.log("🚀 ~ file: ProtectedRoute.tsx:40 ~ dispatch ~ me", me);
  //         dispatch(setUser(me.data as DecodedToken));
  //       });
  //     }
  //   }
  // }, [auth.userData, auth.isLoading]);

  // if (auth.isLoading) return <div>loading...</div>;

  if (error || error_description) {
    return (
      <div>
        <h1>error</h1>
        <p>Error: {error}</p>
        <p>Description: {error_description}</p>
      </div>
    );
  }

  // if (auth.userData && user) {
  //   return <>{children}</>;
  // }

  return <>{children}</>;

  return <div>loading...</div>;
};

export default ProtectedRoute;

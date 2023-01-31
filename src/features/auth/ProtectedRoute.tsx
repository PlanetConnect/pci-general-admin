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
  const location = useLocation();

  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      setSavedLoginPath(location.pathname);
      navigate("/login");
    }
  }, [user]);

  const params = new URLSearchParams(location.search);
  const error_description = params.get("error_description");
  const error = params.get("error");

  if (error || error_description) {
    return (
      <div>
        <h1>error</h1>
        <p>Error: {error}</p>
        <p>Description: {error_description}</p>
      </div>
    );
  }
  if (!user) return <div>loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
